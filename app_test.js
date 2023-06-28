// server.js

const express = require("express");
const app = express();
const { applyMiddlewares } = require("./middlewares");
const { applyRoutes } = require("./routes/routes");
const { connectToDatabase } = require("./database");
const { port } = require("./configs");

connectToDatabase(); // 데이터베이스 연결
applyMiddlewares(app); // Apply middlewares
applyRoutes(app); // Apply routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
