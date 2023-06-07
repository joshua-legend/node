const express = require("express");
const router = express.Router();
const { getUserByUsername } = require("../database");

router.post("/", async (req, res) => {
  try {
    // Login 라우트 로직
    console.log(req.body);
    // const user = await getUserByUsername(req.body.username);
    if (user) {
      res.status(200).send("success");
    } else {
      res.status(401).send("인증 실패");
    }
  } catch (error) {
    res.status(500).send("서버 오류");
  }
});

module.exports = {
  setupLoginRoutes: (app) => {
    app.use("/login", router);
  },
};
