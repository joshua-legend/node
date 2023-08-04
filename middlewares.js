// middlewares.js

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

exports.applyMiddlewares = (app) => {
  app.use(bodyParser.json());
  app.use(cookieParser()); // 이 부분을 추가해주세요.
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    const allowedOrigins = ["http://localhost:3001", "https://09-girl.vercel.app/"];
    if (allowedOrigins.includes(origin)) {
      res.setHeader("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", true);

    next();
  });
  app.use(passport.initialize());
};
