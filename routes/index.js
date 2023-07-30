const adminLogin = require("./admin/adminLogin");
const adminLogout = require("./admin/adminLogout");
const adminCheck = require("./admin/adminCheck");
const getItem = require("./items/getItem");
const postItem = require("./items/postItem");
const getPages = require("./pages/getPages");
const getNaverProfile = require("./naver/getNaverProfile");
const postPage = require("./pages/postPage");
const deletePages = require("./pages/deletePages");
const getReceipt = require("./receipt/getReceipt");
const postReceipt = require("./receipt/postReceipt");
const getBandPost = require("./bands/getBandPosts");
const deleteItem = require("./items/deleteItem");
const verifyToken = require("./token/verifyToken");

const authNaver = require("./naver/authNaver");
const redirect = require("./util/redirect");

module.exports = {
  adminCheck,
  adminLogin,
  adminLogout,
  getItem,
  postItem,
  getNaverProfile,
  getPages,
  postPage,
  deletePages,
  getReceipt,
  postReceipt,
  getBandPost,
  deleteItem,
  verifyToken,
  authNaver,
  redirect,
};
