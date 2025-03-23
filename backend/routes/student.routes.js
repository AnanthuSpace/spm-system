const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student/student.controller");

router.get("/ping", studentController.pongFromStudent);
router.get("/", studentController.renderHome);
router.get("/login", studentController.renderLogin);

module.exports = router;
