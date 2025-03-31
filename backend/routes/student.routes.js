import express from "express";
import * as studentController from "../controllers/student/student.controller.js";
import { verifyToken } from "../config/jwtConfig.js";
import { upload } from "../middlewares/multer.js";


const router = express.Router();

router.get("/ping", studentController.pongFromStudent);
router.post("/login", studentController.userLogin);
router.post("/register", studentController.userRegistration);
router.post("/user-otp", studentController.verifyOtp);
router.post("/user-resendotp", studentController.resendOtp);
router.get("/get-user", verifyToken, studentController.fetchUser);
router.post("/apply", verifyToken, studentController.JobApply);
router.get("/applied-jobs", verifyToken, studentController.getAppliedJobs);
router.get("/get-companies", studentController.fetchCompanies);
router.get("/get-jobs", studentController.fetchJobs);
router.post("/edit-user", verifyToken, upload.fields([{ name: "resume", maxCount: 1 }, { name: "certificates", maxCount: 1 },]), studentController.updateUser);


export default router;
