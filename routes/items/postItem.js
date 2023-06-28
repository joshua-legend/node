const { postItemsByStore } = require("../../database");

const postItem = async (req, res) => {
  const { id } = req.params;
  const data = req.body; // modify this line
  if (data.length === 0) return res.status(200).json({ success: true });
  const result = await postItemsByStore(`${id}`, data);
  const isSuccess = result === 1;
  return res.status(200).json({ success: isSuccess });
};

module.exports = postItem;
