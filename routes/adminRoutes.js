const express = require("express");
const AdminController = require("../controllers/AdminController");
const { checkAdmin } = require("../middlwares/adminMiddlwares");

const router = express.Router();

router.post("/new", checkAdmin, AdminController.createAdminAccount);
router.post("/login", AdminController.adminLogin);
router.get("/check", AdminController.checkIsAdmin);
router.get("/logout", AdminController.adminLogout);

module.exports = router;
