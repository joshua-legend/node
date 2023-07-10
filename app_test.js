const express = require("express");
const app = express();
const { applyMiddlewares } = require("./middlewares");
const { applyRoutes } = require("./routes/routes");
const { connectToDatabase } = require("./database");
const { port } = require("./configs");
const passportConfig = require("./passport"); // Passport 설정 파일 가져오기

connectToDatabase(); // 데이터베이스 연결
applyMiddlewares(app); // Apply middlewares
passportConfig();
applyRoutes(app); // Apply routes

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
