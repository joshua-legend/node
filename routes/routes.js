const routers = require("./index");
const passport = require("passport");
const axios = require("axios");

// const passportNaver = require("passport-naver-v2/src/passport-naver");

exports.applyRoutes = (app) => {
  app.post("/login", routers.adminLogin);
  app.get("/logout", routers.adminLogout);
  app.get("/checkAuthentication", routers.adminCheck);
  app.get("/getItemsByStore/:id", routers.getItem);
  app.post("/postItemsByStore/:id", routers.postItem);
  app.post("/deleteItemsByStore/:id", routers.deleteItem);
  app.get("/auth/naver", passport.authenticate("naver")); // 네이버 로그인을 요청하는 경로
  app.get("/auth/naver/logout", passport.authenticate("naver")); // 네이버 로그인을 요청하는 경로
  app.get(
    "/auth/naver/callback",
    passport.authenticate("naver", {
      // 네이버 로그인이 끝난 후의 콜백 경로
      successRedirect: "http://localhost:3001//aaa", // 로그인 성공 시 이동할 경로
      failureRedirect: "/error", // 로그인 실패 시 이동할 경로
    })
  );
  app.get("/auth/naver/disconnect", async (req, res) => {
    try {
      const response = await axios({
        method: "POST",
        url: "https://nid.naver.com/oauth2.0/token",
        params: {
          grant_type: "delete",
          client_id: process.env.NAVER_CLIENT_ID,
          client_secret: process.env.NAVER_CLIENT_SECRET,
          access_token:
            "AAAAOBK1F6nGf7pli_X-fxWuyF4HktmQ5sq89WG889YjhCbhQcMhqSxGbCKFZnrlEe9GHrFjr9GYVCAJY8HKdRRFlWE", // 로그인된 사용자의 액세스 토큰
          service_provider: "NAVER",
        },
      });

      if (response.data.result === "success") {
        console.log("네이버 계정 연동 해제 성공");
        // 필요한 로그아웃 처리 진행
        res.status(200).send("네이버 계정 연동 해제 성공");
      } else {
        console.log("네이버 계정 연동 해제 실패");
        res.status(400).send("네이버 계정 연동 해제 실패");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("서버 오류");
    }
  });
};
