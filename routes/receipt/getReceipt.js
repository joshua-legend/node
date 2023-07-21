const { getReceiptById } = require("../../database");

const getReceipt = async (req, res) => {
  const { id } = req.params;
  const receipt = await getReceiptById(id);
  const isSuccess = Boolean(receipt); // receipt가 있으면 true, 없으면 false가 되도록 Boolean() 사용
  return res.status(200).json({ success: isSuccess, receipt });
};

module.exports = getReceipt;
