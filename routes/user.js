const express = require("express");
const getUsers = require("../controllers/user");
const authentication = require("../middleware/authentication");
const router = express.Router();

router.route("/profile").get(authentication, getUsers);

module.exports = router;
