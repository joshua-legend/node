// routes.js

const { loginAdmin, getItemsByStore, postItemsByStore, deleteItemsByStore } = require("./database");

exports.applyRoutes = (app) => {
  app.post("/login", async (req, res) => {
    const result = await loginAdmin(req.body.username, req.body.password);
    if (result) {
      req.session.isLogin = true;
      return res.status(200).json({ success: true, message: "로그인 성공" });
    } else return res.status(200).json({ success: false, message: "로그인 실패" });
  });

  app.get("/logout", (req, res) => {
    req.session.isLogin = false;
    return res.status(200).json({ success: true, message: "로그아웃 성공" });
  });

  app.get("/checkAuthentication", (req, res) => {
    if (req.session.isLogin) {
      res.status(200).json({ success: true, message: "로그인 성공" });
    } else {
      res.status(200).json({ success: false, message: "로그인 실패" });
    }
  });

  app.get("/getItemsByStore/:id", async (req, res) => {
    const { id } = req.params;

    const result = await getItemsByStore(`store${id}`);
    return res.status(200).json({ success: true, data: result });
  });

  app.post("/postItemsByStore/:id", async (req, res) => {
    const { id } = req.params;
    const data = req.body; // modify this line
    const result = await postItemsByStore(`${id}`, data);
    const isSuccess = result === 1;
    return res.status(200).json({ success: isSuccess });
  });

  app.post("/deleteItemsByStore/:id", async (req, res) => {
    const { id } = req.params;
    const toBeDeletedData = req.body; // modify this line
    if (!toBeDeletedData) {
      return res.status(200).json({ success: isSuccess });
    }

    const result = await deleteItemsByStore(`${id}`, toBeDeletedData);
    const isSuccess = result === 1;
    return res.status(200).json({ success: isSuccess });
  });
};
