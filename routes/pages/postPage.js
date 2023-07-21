const { postPageByStore } = require("../../database");

const postPage = async (req, res) => {
  const data = req.body; // modify this line
  if (data.length === 0) return res.status(200).json({ success: true });
  const result = await postPageByStore(data);
  const isSuccess = result === 1;
  return res.status(200).json({ success: isSuccess });
};

module.exports = postPage;
