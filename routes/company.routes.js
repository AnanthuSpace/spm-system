const express = require("express")
const router = express.Router()
const companyController = require("../controllers/company/company.controller")

router.get("/ping", companyController.pongFromCompany)

module.exports = router