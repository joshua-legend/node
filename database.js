const { MongoClient } = require("mongodb");
const {
  DB,
  ADMIN_COLLECTION,
  STORES_COLLECTION,
  ITEMS_COLLECTION,
  USERS_COLLECTION,
  GOCHON_PAGE_COLLECTION,
} = require("./configs");
const { postComment } = require("./routes/bands/postComment");
const axios = require("axios");
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

const getItemsByStore = async (_id) => {
  const items = await client.db(DB).collection("gochon_pages").findOne({ _id });
  if (!items) return { message: `Store with id ${_id} not found` };
  const data = {
    items,
  };
  return data;
};

const getPagesByStore = async (id) => {
  const place = {
    1: "unyang_pages",
    2: "janggi_pages",
    3: "gochon_pages",
  };
  const items = await client.db(DB).collection(place[id]).find({}).toArray();
  const data = {
    items,
  };
  return data;
};

const postItemsByStore = async (storeId, items) => {
  items = items.map((item) => ({ ...item, located: `store${storeId}` }));
  const result = await client.db(DB).collection(ITEMS_COLLECTION).insertMany(items);
  return result.ok;
};

const postPageByStore = async (data) => {
  const { store, ...newData } = data;
  const { startDay, endDay, ...restData } = newData;
  const startDayDate = new Date(startDay).toISOString().split("T")[0];
  const endDayDate = new Date(endDay).toISOString().split("T")[0];
  const updatedData = {
    ...restData,
    startDay: startDayDate,
    endDay: endDayDate,
  };
  const result = await client.db(DB).collection(store).insertOne(updatedData);

  // const result = await client.db(DB).collection(store).insertOne(newData);

  const storeLink = store.replace("_pages", "");
  const { _id, post_key } = newData;
  const body = `아래 링크를 이용해 주세요! \n
   ${process.env.LOCAL_LINK}/stores/${storeLink}/${_id} \n
   감사합니다.`;
  const post_comment_url = `https://openapi.band.us/v2/band/post/comment/create?access_token=${process.env.BAND_ACCESS_TOKEN}&band_key=${process.env.BAND_TEST_KEY}&post_key=${post_key}&body=${body}`;
  const response = await axios.post(post_comment_url);
  const { result_data } = response;
  console.log(result_data);

  return result.ok;
};

const deletePagesById = async (ids) => {
  const result = await client
    .db(DB)
    .collection(GOCHON_PAGE_COLLECTION)
    .deleteMany({ _id: { $in: ids } });
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

const postReceiptByUser = async (data) => {
  const { path, ...receiptDataWithId } = data;

  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const receiptCollection = `${path}_receipt_${year}${month}`;
  await client.db(DB).collection(receiptCollection).insertOne(receiptDataWithId);

  const userPurchasedCollection = "user_purchase";
  const { _id, receipt } = receiptDataWithId;
  const userPurchase = await client
    .db(DB)
    .collection(userPurchasedCollection)
    .findOne({ userId: receipt.userId });

  if (userPurchase) {
    const result = await client
      .db(DB)
      .collection(userPurchasedCollection)
      .updateOne(
        { userId: receipt.userId },
        { $push: { purchase_items: { collection: receiptCollection, receipt_id: _id } } }
      );
    await postComment(receipt);
    return result.ok;
  } else {
    const result = await client
      .db(DB)
      .collection(userPurchasedCollection)
      .insertOne({
        userId: receipt.userId,
        purchase_items: [
          {
            collection: receiptCollection,
            receipt_id: _id,
          },
        ],
      });
    await postComment(receipt);
    return result.ok;
  }
};

const getReceiptById = async (userId) => {
  const userPurchasedCollection = "user_purchase";
  const data = await client.db(DB).collection(userPurchasedCollection).findOne({ userId });
  const { purchase_items } = data;
  const lastItem = purchase_items.slice(-1)[0];
  const { collection, receipt_id } = lastItem;
  const { receipt } = await client.db(DB).collection(collection).findOne({ _id: receipt_id });
  return receipt;
};

const getUserById = async (id) => {
  const collection = await client.db(DB).collection(USERS_COLLECTION);
  return await collection.findOne({ id: id });
};

const getNaverUser = async (profile) => {
  const collection = await client.db(DB).collection(USERS_COLLECTION);
  const user = await collection.findOne({ id: profile.id });
  if (!user) {
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

const getKakaoUser = async (profile) => {
  const collection = await client.db(DB).collection(USERS_COLLECTION);
  const user = await collection.findOne({ id: profile.id });
  if (!user) {
    const newUser = {
      id: profile.id,
      email: profile._json && profile._json.kakao_account_email,
      nick: profile.displayName,
      provider: "kakao",
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
  getPagesByStore,
  postPageByStore,
  postReceiptByUser,
  getReceiptById,
  deletePagesById,
  deleteItemsByStore,
  getUserById,
  getNaverUser,
  getKakaoUser,
};
