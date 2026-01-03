const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/appointment.controller");

router.post("/", auth, controller.createAppointment);
router.post("/respond", auth, controller.respond);
router.get("/my", auth, controller.getMyAppointments);
router.get("/pending", auth, controller.getPendingRequests);

module.exports = router;
