import express from "express";
import * as adminController from "../controllers/admin/admin.controller.js";

const router = express.Router();

router.post("/login", adminController.adminLogin);
router.get("/get-users", adminController.getUsers);
router.get("/get-company", adminController.getCompany);
router.get("/get-pending-company", adminController.getPendingCompany);
router.post("/verification", adminController.companyVerification);

export default router;
