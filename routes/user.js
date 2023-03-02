const express = require("express");
const { getProfile, updateProfile, getUsers } = require("../controllers/user");
const authentication = require("../middleware/authentication");
const router = express.Router();

router.route("/profile").get(authentication, getProfile).post(authentication, updateProfile);
router.route("/users").get(getUsers);

module.exports = router;
