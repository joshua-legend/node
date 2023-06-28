const { deleteItemsByStore } = require("../../database");

const deleteItem = async (req, res) => {
  const { id } = req.params;
  const toBeDeletedData = req.body; // modify this line
  if (!toBeDeletedData) {
    return res.status(200).json({ success: true });
  }
  console.log(id, toBeDeletedData);
  const result = await deleteItemsByStore(`${id}`, toBeDeletedData);
  const isSuccess = result === 1;
  return res.status(200).json({ success: isSuccess });
};

module.exports = deleteItem;
