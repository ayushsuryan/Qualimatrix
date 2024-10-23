const jwt = require("jsonwebtoken");
const express = require("express");
const auth = require("./auth/authMiddleware");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/login", (req, res) => {
  const SECRET_KEY = process.env.JWT_SECRET || "mysecretkey";
  const hardcodedUsername = "admin";
  const hardcodedPassword = "admin";
  const { username, password } = req.body;

  if (username === hardcodedUsername && password === hardcodedPassword) {
    const token = jwt.sign({ username }, SECRET_KEY);
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/dashboard", auth, (req, res) => {
  res.json({ message: "Welcome to the private route!", user: req.user });
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log("Server is Successfully Running on port " + PORT);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
