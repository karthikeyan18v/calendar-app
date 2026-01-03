const Notification = require("../models/Notification");

exports.list = async (req, res) => {
  const notifications = await Notification.list(req.userId);
  res.json(notifications);
};
