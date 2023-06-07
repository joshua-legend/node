const session = require("express-session");
const bodyParser = require("body-parser");

function setupMiddleware(app) {
  app.use(
    session({
      secure: true,
      secret: "cookie",
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
        Secure: true,
      },
      name: "session-cookie",
    })
  );
  app.use(bodyParser.json());
}

module.exports = {
  setupMiddleware,
};
