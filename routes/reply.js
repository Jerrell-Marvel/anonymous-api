const express = require("express");
const { sendReply, getReplies } = require("../controllers/reply");
const router = express.Router();

router.route("/reply/:messageId").post(sendReply);
// router.route("/reply/:username").get(getReplies);

module.exports = router;
