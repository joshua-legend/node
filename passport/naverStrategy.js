const passport = require("passport");
const jwt = require("jsonwebtoken");
const { Strategy: NaverStrategy } = require("passport-naver-v2");
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
          const user = await getNaverUser(profile);
          const payload = {
            id: user.id,
            provider: user.provider,
            nickname: user.nickname,
          };
          const token = jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, {});
          user.token = token;
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
