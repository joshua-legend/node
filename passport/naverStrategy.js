// passport/naverStrategy.js
const passport = require("passport");
const { Strategy: NaverStrategy, Profile: NaverProfile } = require("passport-naver-v2");
const { getNaverUser } = require("../database");

module.exports = () => {
  passport.use(
    new NaverStrategy(
      {
        clientID: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET,
        callbackURL: "/auth/naver/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log(accessToken);
          const user = await getNaverUser(profile);
          done(null, user);
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
