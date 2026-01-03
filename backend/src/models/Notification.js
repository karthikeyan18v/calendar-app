const pool = require("../config/db");

exports.create = async (id, userId, message) => {
  await pool.query(
    "INSERT INTO notifications (id, user_id, message) VALUES ($1,$2,$3)",
    [id, userId, message]
  );
};

exports.list = async (userId) => {
  const res = await pool.query(
    "SELECT * FROM notifications WHERE user_id=$1 ORDER BY created_at DESC",
    [userId]
  );
  return res.rows;
};
