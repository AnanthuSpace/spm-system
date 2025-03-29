import express from "express";
import * as companyController from "../controllers/company/company.controller.js";

const router = express.Router();

router.get("/ping", companyController.pongFromCompany);
router.post("/register", companyController.companyRegistration); 
router.post("/company-login", companyController.companyLogin); 

export default router;
