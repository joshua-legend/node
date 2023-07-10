const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const { getKakaoUser } = require("../database");

module.exports = () => {
  passport.use(
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_CLIENT_ID,
        callbackURL: "/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await getKakaoUser(profile);
          done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
