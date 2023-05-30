const express = require("express");
const MessageController = require("../controllers/MessageController");
const { checkAdmin } = require("../middlwares/adminMiddlwares");

const router = express.Router();

router.post("/new", MessageController.sendMeessage);
router.get("/all", checkAdmin, MessageController.getAllMessages);
router.get("/query/:query", checkAdmin, MessageController.getUserMessages);
router.get("/unread", checkAdmin, MessageController.getUnreadMessages);
router.get("/read/:query", checkAdmin, MessageController.readMessage);

module.exports = router;
