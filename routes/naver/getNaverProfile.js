const passport = require("passport");
const { getNaverUser, getUserById } = require("../../database");
const jwt = require("jsonwebtoken");

const getNaverProfile = async (req, res, next) => {
  const { id } = req.params;
  const payload = await getUserById(id);
  return res.status(200).json({ success: true, payload });
};

module.exports = getNaverProfile;
