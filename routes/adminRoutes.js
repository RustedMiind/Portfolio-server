const express = require("express");
const AdminController = require("../controllers/AdminController");

const router = express.Router();

router.post("/new", AdminController.createAdminAccount);
router.post("/login", AdminController.adminLogin);
router.get("/logout", AdminController.adminLogout);

module.exports = router;
