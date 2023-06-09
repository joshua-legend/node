const express = require("express");
const app = express();
const { connectToDatabase } = require("./database");
const { setupMiddleware } = require("./middleware");
const { setupAdminRoutes } = require("./routes/adminRoutes");
const { setupIsLoginCheckRoutes } = require("./routes/isLoginCheckRoutes");
const { setupLoginRoutes } = require("./routes/loginRoutes");
const { port } = require("./configs");

connectToDatabase(); // 데이터베이스 연결
setupMiddleware(app); // 미들웨어 설정
setupLoginRoutes(app); // 로그인 라우트 설정
setupIsLoginCheckRoutes(app);
setupAdminRoutes(app); // 관리자 라우트 설정

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
