const { loginAdmin } = require("../../database");

const adminLogin = async (req, res) => {
  const result = await loginAdmin(req.body.username, req.body.password);
  if (result) {
    req.session.isLogin = true;
    return res.status(200).json({ success: true, message: "로그인 성공" });
  } else return res.status(200).json({ success: false, message: "로그인 실패" });
};

module.exports = adminLogin;
