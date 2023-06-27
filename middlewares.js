// middlewares.js

const bodyParser = require("body-parser");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

exports.applyMiddlewares = (app) => {
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // 허용할 도메인을 설정합니다.
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });
  app.use(
    session({
      secret: "09girl",
      resave: false,
      saveUninitialized: false,
      store: new FileStore({
        path: "./sessions",
      }),
      cookie: {},
    })
  );
};
