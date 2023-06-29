// passport/naverStrategy.js
const passport = require("passport");
const { Strategy: NaverStrategy, Profile: NaverProfile } = require("passport-naver-v2");

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
          // const exUser = await user.findOne({ where: { snsId: profile.id, provider: "naver" } });
          if (false) {
            done(null, exUser);
          } else {
            console.log(profile);
            // const newUser = await user.create({
            //   email: profile.emails[0].value,
            //   name: profile.displayName,
            //   snsId: profile.id,
            //   provider: "naver",
            // });
            // console.log(newUser);
            done(null, newUser);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
