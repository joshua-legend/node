const passport = require("passport");

const authNaver = (req, res, next) => {
  const { redirectUrl } = req.query;
  const url = new URL(redirectUrl).searchParams.get("redirectUrl");
  const authOptions = {
    scope: "email",
    state: url,
  };
  passport.authenticate("naver", authOptions)(req, res, next);
};

module.exports = authNaver;
