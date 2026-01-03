const pool = require("../config/db");

exports.create = async (appointment) => {
  const {
    id,
    title,
    type,
    start_time,
    end_time,
    created_by
  } = appointment;

  await pool.query(
    `INSERT INTO appointments 
     (id, title, type, start_time, end_time, created_by)
     VALUES ($1,$2,$3,$4,$5,$6)`,
    [id, title, type, start_time, end_time, created_by]
  );
};

exports.addMeetLink = async (appointmentId, link) => {
  await pool.query(
    "UPDATE appointments SET meet_link=$1 WHERE id=$2",
    [link, appointmentId]
  );
};

exports.getByUser = async (userId) => {
  const res = await pool.query(
    `SELECT DISTINCT a.id, a.title, a.type, a.start_time, a.end_time, a.created_by, a.meet_link,
     COALESCE(ap.status, 'CREATED') as status
     FROM appointments a
     LEFT JOIN appointment_participants ap ON a.id = ap.appointment_id AND ap.user_id = $1
     WHERE ap.user_id = $1 OR a.created_by = $1
     ORDER BY a.start_time DESC`,
    [userId]
  );
  return res.rows;
};
