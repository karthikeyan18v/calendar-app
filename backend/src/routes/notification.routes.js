const router = require("express").Router();
const auth = require("../middleware/auth.middleware");
const controller = require("../controllers/notification.controller");

router.get("/", auth, controller.list);

module.exports = router;
