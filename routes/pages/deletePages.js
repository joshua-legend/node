const { deletePagesById } = require("../../database");

const deletePages = async (req, res) => {
  const toBeDeletedData = req.body; // modify this line
  console.log("toBeDeletedData", toBeDeletedData);
  if (!toBeDeletedData) {
    return res.status(200).json({ success: true });
  }
  const result = await deletePagesById(toBeDeletedData);
  const isSuccess = result === 1;
  return res.status(200).json({ success: isSuccess });
};

module.exports = deletePages;
