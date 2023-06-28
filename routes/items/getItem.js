const {  getItemsByStore } = require("../../database");

const getItem = async (req, res) => {
  const { id } = req.params;
  const result = await getItemsByStore(`store${id}`);
  return res.status(200).json({ success: true, data: result });
};

module.exports = getItem;
