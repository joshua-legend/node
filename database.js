const { MongoClient, ObjectId } = require("mongodb");
const { APIKEY, DB, ADMIN_COLLECTION, STORES_COLLECTION, ITEMS_COLLECTION } = require("./configs");

const client = new MongoClient(APIKEY);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
};

const loginAdmin = async (username, password) => {
  const admin = await client
    .db(DB)
    .collection(ADMIN_COLLECTION)
    .findOne({ id: username, pw: password });
  return !!admin; // 로그인 성공한 경우 true 반환, 그렇지 않은 경우 false 반환
};

const getItemsByStore = async (storeId) => {
  const store = await client.db(DB).collection(STORES_COLLECTION).findOne({ _id: storeId });
  if (!store) throw new Error(`Store with id ${storeId} not found`);
  const items = await client
    .db(DB)
    .collection(ITEMS_COLLECTION)
    .find({ located: store._id })
    .toArray();
  console.log(items);
  const data = {
    storeName: store.storeName,
    items,
  };
  return data;
};

const postItemsByStore = async (storeId, items) => {
  items = items.map((item) => ({ ...item, located: `store${storeId}` }));
  const result = await client.db(DB).collection(ITEMS_COLLECTION).insertMany(items);
  console.log(result.ok);
  return result.ok;
};

const deleteItemsByStore = async (storeId, items) => {
  const itemIds = items.map((item) => ObjectId(item._id));
  console.log(itemIds);
  const result = await client
    .db(DB)
    .collection(ITEMS_COLLECTION)
    .deleteMany({ _id: { $in: itemIds } });
  return result.ok;
};

module.exports = {
  connectToDatabase,
  loginAdmin,
  getItemsByStore,
  postItemsByStore,
  deleteItemsByStore,
};
