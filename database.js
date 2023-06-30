const { MongoClient } = require("mongodb");
const {
  DB,
  ADMIN_COLLECTION,
  STORES_COLLECTION,
  ITEMS_COLLECTION,
  USERS_COLLECTION,
} = require("./configs");
require("dotenv").config();

const client = new MongoClient(process.env.DB_PASSWORD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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
  const data = {
    storeName: store.storeName,
    items,
  };
  return data;
};

const postItemsByStore = async (storeId, items) => {
  items = items.map((item) => ({ ...item, located: `store${storeId}` }));
  const result = await client.db(DB).collection(ITEMS_COLLECTION).insertMany(items);
  return result.ok;
};

const deleteItemsByStore = async (storeId, items) => {
  const itemIds = items.map((item) => item._id);
  const result = await client
    .db(DB)
    .collection(ITEMS_COLLECTION)
    .deleteMany({ _id: { $in: itemIds } });
  return result.ok;
};

const getUserById = async (id) => {
  const collection = await client.db(DB).collection(USERS_COLLECTION);
  return await collection.findOne({ id: id });
};

const getNaverUser = async (profile) => {
  const collection = await client.db(DB).collection(USERS_COLLECTION);
  const user = await collection.findOne({ id: profile.id });

  if (!user) {
    console.log("통과!");
    const newUser = {
      id: profile.id,
      provider: profile.provider,
      nickname: profile.nickname,
      profileImage: profile.profileImage,
      age: profile.age,
      gender: profile.gender,
      email: profile.email,
      mobile: profile.mobile,
      mobileE164: profile.mobileE164,
      name: profile.name,
      birthday: profile.birthday,
      birthYear: profile.birthYear,
    };
    const result = await collection.insertOne(newUser);
    return result.ops[0];
  }
  return user;
};

module.exports = {
  connectToDatabase,
  loginAdmin,
  getItemsByStore,
  postItemsByStore,
  deleteItemsByStore,
  getUserById,
  getNaverUser,
};
