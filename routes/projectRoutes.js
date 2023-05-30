const express = require("express");
const ProjectController = require("../controllers/ProjectController");
const { checkAdmin } = require("../middlwares/adminMiddlwares");

const router = express.Router();

router.get("/all", ProjectController.getAllProjects);
router.post("/new", checkAdmin, ProjectController.createNewProject);
router.patch("/:id", checkAdmin, ProjectController.modifyProject);
router.delete("/:id", checkAdmin, ProjectController.deleteProject);

module.exports = router;
