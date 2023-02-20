const express = require("express");
const app = express();

require("express-async-errors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const jwt = require("jsonwebtoken");
const cors = require("cors");

// get the client
const mysql = require("mysql2/promise");
const db = require("./db/connectDB");
const User = require("./models/User.model");

(async function main() {
  app.use(cors());

  const PORT = 5000;
  app.listen(PORT, async () => {
    try {
      await db.sync({ force: true });
      console.log(`Server started on port ${PORT}`);
    } catch (err) {
      console.error("Unable to connect to the database : ", err);
    }
  });
})();
