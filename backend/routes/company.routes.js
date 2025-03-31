import express from "express";
import * as companyController from "../controllers/company/company.controller.js";
import { verifyToken } from "../config/jwtConfig.js";

const router = express.Router();

router.get("/ping", companyController.pongFromCompany);
router.post("/register", companyController.companyRegistration);
router.post("/company-login", companyController.companyLogin);
router.get("/get-profile", verifyToken, companyController.getCompanyProfile);
router.post("/update-profile", verifyToken, companyController.updateCompany);
router.post("/add-job", verifyToken, companyController.addJobs);
router.get("/get-jobs", verifyToken, companyController.getCompanyJobs);
router.get("/get-students", verifyToken, companyController.fetchStudents);

export default router;
