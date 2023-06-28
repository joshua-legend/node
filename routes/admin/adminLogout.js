
const adminLogout = (req, res) => {
  req.session.isLogin = false;
  return res.status(200).json({ success: true, message: "로그아웃 성공" });
};

module.exports = adminLogout;
