const express = require("express");
const { sendMessage, getMessages } = require("../controllers/message");
const router = express.Router();

router.route("/message/:userId").post(sendMessage);
router.route("/message/:username").get(getMessages);

module.exports = router;
