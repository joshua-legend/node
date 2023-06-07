const { MongoClient } = require("mongodb");
const { APIKEY, DB, ADMIN_COLLECTION } = require("./configs");

const client = new MongoClient(APIKEY);
let collection;

async function connectToDatabase() {
  try {
    await client.connect();
    const database = client.db(DB);
    collection = database.collection(ADMIN_COLLECTION);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

async function getUserByUsername(username) {
  const user = await collection.findOne({ username });
  return user;
}

module.exports = {
  connectToDatabase,
  getUserByUsername,
};
