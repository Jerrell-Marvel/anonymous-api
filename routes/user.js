const express = require("express");
const { getProfile, updateProfile } = require("../controllers/user");
const authentication = require("../middleware/authentication");
const router = express.Router();

router.route("/profile").get(authentication, getProfile).post(authentication, updateProfile);

module.exports = router;
