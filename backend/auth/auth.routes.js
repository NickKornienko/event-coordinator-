const express = require("express");
const router = express.Router();
const authController = require("./auth.controller");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/user-info", authController.getUserInfo);
router.post("/change-password", authController.changePassword);

module.exports = router;