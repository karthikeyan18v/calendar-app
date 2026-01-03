const pool = require("../config/db");

exports.findByPhone = async (phone) => {
  const res = await pool.query(
    "SELECT * FROM users WHERE phone = $1",
    [phone]
  );
  return res.rows[0];
};

exports.create = async ({ id, phone, password, name, age, timezone }) => {
  await pool.query(
    "INSERT INTO users (id, phone, password, name, age, timezone) VALUES ($1,$2,$3,$4,$5,$6)",
    [id, phone, password, name, age, timezone]
  );
};

exports.search = async (query, excludeUserId) => {
  const res = await pool.query(
    "SELECT id, name, phone FROM users WHERE (name ILIKE $1 OR phone LIKE $1) AND id != $2 LIMIT 10",
    [`%${query}%`, excludeUserId]
  );
  return res.rows;
};
