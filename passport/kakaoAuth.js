// naverAuth.js
const passport = require("passport");

exports.kakaoCallback = passport.authenticate("kakao", {
  successRedirect: "http://localhost:3001/select",
  failureRedirect: "http://localhost:3001/",
});

exports.kakaoDisconnect = async (req, res) => {};
