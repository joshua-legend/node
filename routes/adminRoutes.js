const express = require("express");
const router = express.Router();
const { collection } = require("../database");

router.get("/", async (req, res) => {
  try {
    // Admin 라우트 로직
    console.log("Admin route");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = {
  setupAdminRoutes: (app) => {
    app.use("/admin", router);
  },
};
