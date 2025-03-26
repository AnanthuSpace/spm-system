import express from "express";
import { pongFromCompany, companyRegistration } from "../controllers/company/company.controller.js";

const router = express.Router();

router.get("/ping", pongFromCompany);
router.get("/registration", companyRegistration);

export default router;
