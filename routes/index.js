const adminLogin = require("./admin/adminLogin");
const adminLogout = require("./admin/adminLogout");
const adminCheck = require("./admin/adminCheck");
const getItem = require("./items/getItem");
const postItem = require("./items/postItem");
const getPages = require("./pages/getPages");
const postPage = require("./pages/postPage");
const getReceipt = require("./receipt/getReceipt");
const postReceipt = require("./receipt/postReceipt");
const getBandPost = require("./bands/getBandPosts");
const deleteItem = require("./items/deleteItem");
const verifyToken = require("./token/verifyToken");

module.exports = {
  adminCheck,
  adminLogin,
  adminLogout,
  getItem,
  postItem,
  getPages,
  postPage,
  getReceipt,
  postReceipt,
  getBandPost,
  deleteItem,
  verifyToken,
};
