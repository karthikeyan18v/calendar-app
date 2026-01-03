const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { phone, password, name, age, timezone } = req.body;

  const existing = await User.findByPhone(phone);
  if (existing) {
    return res.status(400).json({ error: "Phone already registered" });
  }

  const { v4: uuidv4 } = await import("uuid");
  const user = { id: uuidv4(), phone, password, name, age, timezone };
  await User.create(user);

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ token, user });
};

exports.login = async (req, res) => {
  const { phone, password } = req.body;

  const user = await User.findByPhone(phone);
  if (!user || user.password !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  res.json({ token, user });
};

exports.searchUsers = async (req, res) => {
  const { query } = req.query;
  const users = await User.search(query, req.userId);
  res.json(users);
};
