const express = require("express");
const getProfile = require("../controllers/user");
const authentication = require("../middleware/authentication");
const router = express.Router();

router.route("/profile").get(authentication, getProfile);

module.exports = router;
