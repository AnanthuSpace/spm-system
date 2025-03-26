import express from "express";
import * as studentController from "../controllers/student/student.controller.js"; 


const router = express.Router();

router.get("/ping", studentController.pongFromStudent);
router.get("/", studentController.renderHome);
router.get("/login", studentController.renderLogin);
router.post("/register", studentController.userRegistration);

export default router;
