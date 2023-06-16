const express = require("express");
const app = express();
const { connectToDatabase, loginAdmin } = require("./database");
const { port } = require("./configs");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");

connectToDatabase(); // 데이터베이스 연결

app.use(cookieParser());
app.use(
  session({
    secret: "09girl",
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 600 * 1000, // 5분(밀리초 단위로 지정)
    },
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // 허용할 도메인을 설정합니다.
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(passport.initialize({})); // Initialize Passport middleware
app.use(
  passport.session({
    secret: "09girl",
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 600 * 1000, // 5분(밀리초 단위로 지정)
    },
  })
);
app.use(bodyParser.json());

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
  // 데이터베이스에서 사용자를 조회한 후, 유효한 사용자인 경우에는 done(null, user)로 사용자 객체를 전달해야 합니다.
  // 사용자를 찾을 수 없는 경우에는 done(null, null)을 호출합니다.
  done(null, null); // 데이터베이스 조회 로직을 추가해야 합니다.
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  req.login(req.user, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "로그인 실패" });
    }
    return res.json({ success: true, message: "로그인 성공", data: req.user });
  });
});

app.get("/checkAuthentication", async (req, res) => {
  console.log("req.isAuthenticated()", req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.status(200).json({ isAuthenticated: true, user: req.session.user });
  } else {
    res.status(200).json({ isAuthenticated: false, req: req.isAuthenticated });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
