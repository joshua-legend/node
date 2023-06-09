const { MongoClient } = require("mongodb");
const { APIKEY, DB, ADMIN_COLLECTION } = require("./configs");

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

module.exports = {
  connectToDatabase,
  loginAdmin,
};
