const routers = require("./index");

exports.applyRoutes = (app) => {
  app.post("/login", routers.adminLogin);
  app.get("/logout", routers.adminLogout);
  app.get("/checkAuthentication", routers.adminCheck);
  app.get("/getItemsByStore/:id", routers.getItem);
  app.post("/postItemsByStore/:id", routers.postItem);
  app.post("/deleteItemsByStore/:id", routers.deleteItem);
};
