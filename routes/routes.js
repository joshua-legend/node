const routers = require("./index");
const passport = require("passport");
// const passportNaver = require("passport-naver-v2/src/passport-naver");

exports.applyRoutes = (app) => {
  app.post("/login", routers.adminLogin);
  app.get("/logout", routers.adminLogout);
  app.get("/checkAuthentication", routers.adminCheck);
  app.get("/getItemsByStore/:id", routers.getItem);
  app.post("/postItemsByStore/:id", routers.postItem);
  app.post("/deleteItemsByStore/:id", routers.deleteItem);
  app.get("/auth/naver", passport.authenticate("naver")); // 네이버 로그인을 요청하는 경로
  app.get(
    "/auth/naver/callback",
    passport.authenticate("naver", {
      // 네이버 로그인이 끝난 후의 콜백 경로
      successRedirect: "/", // 로그인 성공 시 이동할 경로
      failureRedirect: "/login", // 로그인 실패 시 이동할 경로
    })
  );
};
