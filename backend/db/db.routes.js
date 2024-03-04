const express = require("express");
const router = express.Router();
const dbController = require("./db.controller");

router.post("/create_event", dbController.create_event);
router.delete("/delete_event", dbController.delete_event);
router.post("/edit_event", dbController.edit_event);
router.post("/update_attendance", dbController.update_attendance);
router.get("/get_events", dbController.get_events);
router.get("/get_event", dbController.get_event);

module.exports = router;
