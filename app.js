const express = require("express");
const app = express();
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const bodyParser = require("body-parser");
const { connectToDatabase, loginAdmin } = require("./database");
const { port } = require("./configs");
connectToDatabase(); // 데이터베이스 연결
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // 허용할 도메인을 설정합니다.
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(
  session({
    secret: "09girl",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      path: "./sessions",
      // reapInterval: 60 * 60 * 1000, // Check expired sessions every 1 hour
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      // maxAge: 60 * 60 * 1000, // 30분
    },
  })
);

app.post("/login", async (req, res) => {
  const result = await loginAdmin(req.body.username, req.body.password);
  if (result) {
    req.session.isLogin = true;
    return res.status(200).json({ success: true, message: "로그인 성공" });
  } else return res.status(200).json({ success: false, message: "로그인 실패" });
});

app.get("/logout", (req, res) => {
  console.log(req.session);
  req.session.isLogin = false;
  return res.status(200).json({ success: true, message: "로그아웃 성공" });
});

app.get("/checkAuthentication", (req, res) => {
  console.log(req.session);
  if (req.session.isLogin) {
    res.status(200).json({ success: true, message: "로그인 성공" });
  } else {
    res.status(200).json({ success: false, message: "로그인 실패" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
