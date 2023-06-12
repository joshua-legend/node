const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const router = express.Router();
const { loginAdmin } = require("../database");

// Local Strategy for Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      session: true,
      passReqToCallback: false,
    },
    async (username, password, done) => {
      try {
        const result = await loginAdmin(username, password);
        console.log(result);
        if (result) {
          return done(null, username);
        } else {
          return done(null, false, { message: "로그인 실패" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Passport session setup.
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((username, done) => {
  done(null, "success!");
  // Here you would look up the user in your database using the user's username.
  // If the user exists, you would call done() with the user object, otherwise with null.
});

router.post("/", passport.authenticate("local", {}), (req, res) => {
  req.login(req.user, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "로그인 실패" });
    }
    return res.json({ success: true, message: "로그인 성공", data: req.user });
  });
});

module.exports = {
  setupLoginRoutes: (app) => {
    app.use(passport.initialize()); // Initialize Passport middleware
    app.use(passport.session()); // Initialize Passport session
    app.use("/login", router);
  },
};
