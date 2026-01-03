const Appointment = require("../models/Appointment");
const Participant = require("../models/AppointmentParticipant");
const Notification = require("../models/Notification");
const { createJitsiMeet } = require("../utils/meet");

exports.createAppointment = async (req, res) => {
  const { title, start_time, end_time, participants } = req.body;
  const { v4: uuid } = await import("uuid");
  const appointmentId = uuid();

  await Appointment.create({
    id: appointmentId,
    title,
    type: "MEETING",
    start_time,
    end_time,
    created_by: req.userId
  });

  // Add creator as participant with ACCEPTED status
  await Participant.addWithStatus(uuid(), appointmentId, req.userId, "ACCEPTED");

  for (const userId of participants) {
    await Participant.add(uuid(), appointmentId, userId);
    await Notification.create(
      uuid(),
      userId,
      `New appointment request: ${title}`
    );
  }

  // Check if all participants accepted (only creator at this point)
  const allAccepted = await Participant.allAccepted(appointmentId);
  if (allAccepted) {
    const link = createJitsiMeet();
    await Appointment.addMeetLink(appointmentId, link);
  }

  res.json({ appointmentId });
};

exports.respond = async (req, res) => {
  const { appointmentId, status } = req.body;

  await Participant.updateStatus(
    appointmentId,
    req.userId,
    status
  );

  if (status === "ACCEPTED") {
    const allAccepted = await Participant.allAccepted(appointmentId);
    if (allAccepted) {
      const link = createJitsiMeet();
      await Appointment.addMeetLink(appointmentId, link);
    }
  }

  res.json({ success: true });
};

exports.getMyAppointments = async (req, res) => {
  const appointments = await Appointment.getByUser(req.userId);
  res.json(appointments);
};

exports.getPendingRequests = async (req, res) => {
  const requests = await Participant.getPendingByUser(req.userId);
  res.json(requests);
};
