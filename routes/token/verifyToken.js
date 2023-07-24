const jwt = require("jsonwebtoken");

const verifyToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(200).json({ success: false, message: "로그인 실패" });
  }
  try {
    const payload = jwt.verify(token, "jwtSecret");
    console.log(payload);
    if (!payload) res.status(200).json({ success: false });
    else res.status(200).json({ success: true });
  } catch (error) {
    // 토큰이 유효하지 않다면, 에러 메시지를 클라이언트에게 반환
    res.status(200).json({ success: false });
  }
};

module.exports = verifyToken;
