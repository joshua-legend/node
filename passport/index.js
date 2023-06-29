// passport/index.js
const passport = require("passport");
const local = require("./localStrategy");
const naver = require("./naverStrategy");
const user = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    user
      .findById(id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  naver();
};
