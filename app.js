const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const APIKEY =
  "mongodb+srv://joshua_apple:qwer1234@cluster.jk35tho.mongodb.net/?retryWrites=true&w=majority";
const port = 8080;
const DB = "09Girl";
const ADMIN_COLLECTION = "admin";
const client = new MongoClient(APIKEY);

app.listen(port, async () => {
  try {
    await client.connect();
    const database = client.db(DB);
    const collection = database.collection(ADMIN_COLLECTION);

    app.get("/admin", async (req, res) => {
      try {
        const items = {
          item1: { name: "123", price: 3000 },
          item2: { name: "23", price: 2500 },
          item3: { name: "15", price: 2000 },
        };
        const result = await collection.insertOne(items);
        console.log(
          `A document was inserted with the _id: ${result.insertedId}`
        );
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas:", err);
  }
});
