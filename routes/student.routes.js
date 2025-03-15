const express = require("express")
const router = express.Router()
const studentController = require("../controllers/student/student.controlller")

router.get("/ping", studentController.pongFromStudent)
router.get("/", studentController.renderHome)

module.exports = router