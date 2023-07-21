const { getItemsByStore } = require("../../database");

const getItem = async (req, res) => {
  const { id } = req.params;
  const result = await getItemsByStore(id);
  if ("message" in result) {
    return res.status(404).json({ success: false, message: result.message });
  }

  return res.status(200).json({ success: true, data: result });
};

module.exports = getItem;
