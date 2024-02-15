const express = require("express");
const router = express.Router();
const dbController = require("./db.controller");

router.post("/create_event", dbController.create_event);
router.delete("/delete_event", dbController.delete_event);

module.exports = router;
