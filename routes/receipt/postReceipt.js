const { postReceiptByUser } = require("../../database");

const postReceipt = async (req, res) => {
  const data = req.body; // modify this line
  const result = await postReceiptByUser(data);
  const isSuccess = result === 1;
  return res.status(200).json({ success: isSuccess });
};

module.exports = postReceipt;
