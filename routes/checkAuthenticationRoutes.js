const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  console.log("test");
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    res.status(200).json({ isAuthenticated: true, user: req.user });
  } else {
    res.status(200).json({ isAuthenticated: false });
  }
});

module.exports = {
  setupCheckAuthenticationRoutes: (app) => {
    app.use("/checkAuthentication", router);
  },
};
