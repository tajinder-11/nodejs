const express = require("express");

const app = express();
const PORT = 8000;
app.use(express.json());

const DIARY = {};
const EMAILS = new Set();

app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (EMAILS.has(email)) {
    res.status(400).json({ error: "Email already exists." });
  }
  if (!email) {
    res.status(400).json({ error: "Email can not be empty." });
  }
  if (!password) {
    res.status(400).json({ error: "Password can not be empty." });
  }
  const token = `${Date.now()}`;
  DIARY[token] = { name, email, password };
  EMAILS.add(email);

  res.json({ status: "Success", token });
});

app.post("/me", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "token is required." });
  }

  if (!(token in DIARY)) {
    return res.status(400).json({ error: "Invalid token" });
  }

  const entry = DIARY[token];

  res.json({ status: "Take your car", data: entry });
});

app.post("/private-data", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ error: "token is required." });
  }

  if (!(token in DIARY)) {
    return res.status(400).json({ error: "Invalid token" });
  }

  const entry = DIARY[token];
  res.json({ data: entry });
});

app.listen(PORT, () => {
  console.log(`app listening at port number ${PORT}`);
});
