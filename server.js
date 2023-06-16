const express = require("express");
const cookieParser = require("cookie-parser");
const { port } = require("./configs");

const app = express();
app.use(cookieParser());

app.get("/set-cookie", (req, res) => {
  res.cookie("myCookie", "Hello, World!");
  res.send("Cookie has been set.");
});

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // 허용할 도메인을 설정합니다.
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.get("/read-cookie", (req, res) => {
  const myCookie = req.cookies.myCookie;
  res.send(`The value of myCookie is: ${myCookie}`);
});

app.get("/greet", (req, res) => {
  const name = req.cookies.name || "Guest";
  res.send(`Hello, ${name}!`);
});

app.get("/login", (req, res) => {
  // 세션 쿠키
  res.cookie("sessionCookie", "abc123", { httpOnly: true });

  // 영구 쿠키 (7일 동안 유지)
  res.cookie("permanentCookie", "123abc", { maxAge: 7 * 24 * 60 * 60 * 1000 });

  res.send("Logged in successfully.");
});

app.get("/logout", (req, res) => {
  // 세션 쿠키 삭제
  res.clearCookie("sessionCookie");

  // 영구 쿠키 삭제
  res.clearCookie("permanentCookie");

  res.send("Logged out successfully.");
});

app.get("/secure-cookie", (req, res) => {
  res.cookie("secureCookie", "123", { secure: true });
  res.send("Secure cookie has been set.");
});

app.get("/http-only-cookie", (req, res) => {
  res.cookie("httpOnlyCookie", "456", { httpOnly: true });
  res.send("HttpOnly cookie has been set.");
});

app.get("/path-cookie", (req, res) => {
  res.cookie("pathCookie", "789", { path: "/specific-path" });
  res.send("Path cookie has been set.");
});

app.get("/domain-cookie", (req, res) => {
  res.cookie("domainCookie", "xyz", { domain: ".example.com" });
  res.send("Domain cookie has been set.");
});

// 사용자 로그인
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // 사용자 인증 로직
  if (isValidUser(username, password)) {
    // 인증 성공 시 쿠키에 사용자 정보 저장
    res.cookie("loggedInUser", username);
    res.send("Logged in successfully.");
  } else {
    res.status(401).send("Invalid credentials.");
  }
});

// 인증된 사용자만 접근 가능한 페이지
app.get("/secret", (req, res) => {
  const loggedInUser = req.cookies.loggedInUser;
  if (loggedInUser) {
    res.send(`Welcome, ${loggedInUser}! This is a secret page.`);
  } else {
    res.status(401).send("Unauthorized access.");
  }
});

app.listen(8080, () => {
  console.log(`Server is running on 8080 ${port}`);
});
