// naverAuth.js
const passport = require("passport");
const axios = require("axios");
const jwt = require("jsonwebtoken");

exports.naverCallback = (req, res, next) => {
  passport.authenticate(
    "naver",
    { session: false }, // 이 부분을 추가하였습니다.
    (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (!user) {
        return res.redirect("http://localhost:3001/");
      }
      const payload = {
        id: user.id,
        provider: user.provider,
        nickname: user.nickname,
        mobile: user.mobile,
        name: user.name,
        email: user.email,
      };
      const token = jwt.sign(payload, "jwtSecret", { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true });
      const redirectUrl = req.query.state;
      return res.redirect(`${process.env.CGP_LINK}/redirect?state=${redirectUrl}`);
    }
  )(req, res, next);
};

exports.naverDisconnect = async (req, res) => {
  try {
    const response = await axios({
      method: "POST",
      url: "https://nid.naver.com/oauth2.0/token",
      params: {
        grant_type: "delete",
        client_id: process.env.NAVER_CLIENT_ID,
        client_secret: process.env.NAVER_CLIENT_SECRET,
        access_token:
          "AAAAOBK1F6nGf7pli_X-fxWuyF4HktmQ5sq89WG889YjhCbhQcMhqSxGbCKFZnrlEe9GHrFjr9GYVCAJY8HKdRRFlWE",
        service_provider: "NAVER",
      },
    });

    if (response.data.result === "success") {
      console.log("네이버 계정 연동 해제 성공");
      res.status(200).send("네이버 계정 연동 해제 성공");
    } else {
      console.log("네이버 계정 연동 해제 실패");
      res.status(400).send("네이버 계정 연동 해제 실패");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류");
  }
};
