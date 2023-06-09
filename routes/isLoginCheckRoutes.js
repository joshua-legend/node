const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log("req.session", req.session);
    if (req.session && req.session.cookie.loggedIn) {
      res.status(200).json({ success: true });
    } else res.status(200).json({ success: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  setupIsLoginCheckRoutes: (app) => {
    app.use("/isLoginCheck", router);
  },
};
