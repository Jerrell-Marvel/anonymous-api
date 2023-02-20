const express = require("express");
const getUsers = require("../controllers/user");
const router = express.Router();

router.route("/profile").get(getUsers);

module.exports = router;
