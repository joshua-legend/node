const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const setupMiddleware = (app) => {
  app.use(cookieParser());
  app.use(
    session({
      secret: "09girl",
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: true,
        maxAge: 5 * 60 * 1000, // 5분(밀리초 단위로 지정)
      },
    })
  );
  app.use(bodyParser.json());
};

module.exports = {
  setupMiddleware,
};
