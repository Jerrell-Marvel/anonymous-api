const express = require("express");
const { sendReply, getReplies } = require("../controllers/reply");
const router = express.Router();
const authentication = require("../middleware/authentication");
router.route("/reply/:messageId").post(authentication, sendReply);
// router.route("/reply/:username").get(getReplies);

module.exports = router;
