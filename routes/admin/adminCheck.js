const adminCheck = (req, res) => {
  if (req.session.isLogin) {
    return res.status(200).json({ success: true, message: "로그인 성공" });
  } else {
    return res.status(200).json({ success: false, message: "로그인 실패" });
  }
};

module.exports = adminCheck;
