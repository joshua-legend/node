// passport/index.js
const passport = require("passport");
const local = require("./localStrategy");
const naver = require("./naverStrategy");
const kakao = require("./kakaoStrategy");
const { getUserById } = require("../database"); // Add this line

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id);
      done(null, user);
    } catch (error) {
      console.error(error);
      done(error, false);
    }
  });

  local();
  naver();
  kakao();
};
