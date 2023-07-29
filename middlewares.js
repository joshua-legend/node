// middlewares.js

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");

exports.applyMiddlewares = (app) => {
  app.use(bodyParser.json());
  app.use(cookieParser()); // 이 부분을 추가해주세요.
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // 허용할 도메인을 설정합니다.
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
  app.use(passport.initialize());
};
