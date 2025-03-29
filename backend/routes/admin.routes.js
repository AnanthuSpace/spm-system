import express from "express";
import * as adminController from "../controllers/admin/admin.controller.js";

const router = express.Router();

router.post("/login", adminController.adminLogin);
router.get("/get-users", adminController.getUsers);

export default router;
