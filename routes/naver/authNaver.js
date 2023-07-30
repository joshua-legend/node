const passport = require("passport");
const { getNaverUser } = require("../../database");
const jwt = require("jsonwebtoken");

const authNaver = async (req, res, next) => {
  const profile = req.body; // modify this line
  const payload = {
    id: profile.id,
    provider: profile.provider,
    nickname: profile.nickname,
    mobile: profile.mobile,
    name: profile.name,
    email: profile.email,
  };
  const token = jwt.sign(payload, "jwtSecret", { expiresIn: "1h" });
  return res.status(200).json({ success: true, token, payload });
};

module.exports = authNaver;
