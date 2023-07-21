const routers = require("./index");
const passport = require("passport");
const naverAuth = require("../passport/naverAuth"); // naverAuth.js 파일 불러오기
const kakaoAuth = require("../passport/kakaoAuth"); // naverAuth.js 파일 불러오기

exports.applyRoutes = (app) => {
  app.post("/login", routers.adminLogin);
  app.get("/logout", routers.adminLogout);
  app.get("/checkAuthentication", routers.adminCheck);
  app.get("/getPagesByStore/:id", routers.getPages);
  app.get("/getItemsByStore/:id", routers.getItem);
  app.post("/postItemsByStore/:id", routers.postItem);
  app.post("/postPageByStore", routers.postPage);
  app.get("/getReceipt/:id", routers.getReceipt);
  app.get("/getBandPosts", routers.getBandPost);
  app.post("/postReceiptByUser", routers.postReceipt);
  app.post("/deleteItemsByStore/:id", routers.deleteItem);
  app.get("/auth/naver", passport.authenticate("naver")); // 네이버 로그인을 요청하는 경로
  app.get("/auth/naver/logout", passport.authenticate("naver")); // 네이버 로그인을 요청하는 경로
  app.get("/auth/naver/callback", naverAuth.naverCallback);
  app.get("/auth/naver/disconnect", naverAuth.naverDisconnect);
  app.get("/auth/kakao", passport.authenticate("kakao"));
  app.get("/auth/kakao/callback", kakaoAuth.kakaoCallback);
  app.get("/verifyToken", routers.verifyToken);
};
