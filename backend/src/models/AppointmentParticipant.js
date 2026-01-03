const pool = require("../config/db");

exports.add = async (id, appointmentId, userId) => {
  await pool.query(
    `INSERT INTO appointment_participants 
     (id, appointment_id, user_id, status)
     VALUES ($1,$2,$3,'PENDING')`,
    [id, appointmentId, userId]
  );
};

exports.addWithStatus = async (id, appointmentId, userId, status) => {
  await pool.query(
    `INSERT INTO appointment_participants 
     (id, appointment_id, user_id, status)
     VALUES ($1,$2,$3,$4)`,
    [id, appointmentId, userId, status]
  );
};

exports.updateStatus = async (appointmentId, userId, status) => {
  await pool.query(
    `UPDATE appointment_participants
     SET status=$1
     WHERE appointment_id=$2 AND user_id=$3`,
    [status, appointmentId, userId]
  );
};

exports.allAccepted = async (appointmentId) => {
  const res = await pool.query(
    `SELECT COUNT(*) FILTER (WHERE status != 'ACCEPTED') AS pending
     FROM appointment_participants
     WHERE appointment_id=$1`,
    [appointmentId]
  );
  return res.rows[0].pending === "0";
};

exports.getPendingByUser = async (userId) => {
  const res = await pool.query(
    `SELECT a.*, ap.status, u.name as creator_name
     FROM appointments a
     JOIN appointment_participants ap ON a.id = ap.appointment_id
     JOIN users u ON a.created_by = u.id
     WHERE ap.user_id = $1 AND ap.status = 'PENDING'
     ORDER BY a.start_time DESC`,
    [userId]
  );
  return res.rows;
};
