import express from "express";
import * as studentController from "../controllers/student/student.controller.js"; 


const router = express.Router();

router.get("/ping", studentController.pongFromStudent);
router.get("/", studentController.renderHome);
router.post("/login", studentController.userLogin);
router.post("/register", studentController.userRegistration);
router.post("/user-otp", studentController.verifyOtp);
router.post("/user-resendotp", studentController.resendOtp);

export default router;
