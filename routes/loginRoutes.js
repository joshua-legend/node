const express = require("express");
const router = express.Router();
const { loginAdmin } = require("../database");

router.post("/", async (req, res) => {
  try {
    const result = await loginAdmin(req.body.username, req.body.password);
    if (result) {
      console.log(req.session);
      req.session.loggedIn = true;
      console.log(req.session);
      res.status(200).json({ success: true, message: "로그인 성공", data: {} });
    } else {
      res
        .status(200)
        .json({ success: false, message: "로그인 실패", data: {} });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "서버 오류", data: {} });
  }
});

module.exports = {
  setupLoginRoutes: (app) => {
    app.use("/login", router);
  },
};
