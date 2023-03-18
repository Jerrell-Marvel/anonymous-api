const express = require("express");
const { sendMessage, getMessages, deleteMessage } = require("../controllers/message");
const authentication = require("../middleware/authentication");
const router = express.Router();

router.route("/message/:userId").post(sendMessage);
router.route("/message/:messageId").delete(authentication, deleteMessage);
router.route("/message/:username").get(getMessages);

module.exports = router;
