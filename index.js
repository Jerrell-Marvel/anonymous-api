const express = require("express");
const app = express();

require("express-async-errors");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const cors = require("cors");

const cookieParser = require("cookie-parser");

//JWT
const jwt = require("jsonwebtoken");

// get the client
const mysql = require("mysql2/promise");
const db = require("./db/connectDB");
const User = require("./models/User.model");

const userRoutes = require("./routes/user");
const errorHandler = require("./middleware/errorHandler");

require("dotenv").config();

(async function main() {
  //Parse json
  app.use(express.json());

  //Cors
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000", "127.0.0.1:5500", "192.168.0.182:3000"],
    })
  );

  //Cookie parser
  app.use(cookieParser());

  //Passport
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        const user = await User.findOne({
          where: {
            id: profile.id,
          },
        });

        if (!user) {
          const addedUser = await User.create({
            id: profile.id,
          });

          const { id } = addedUser.dataValues;
          const token = jwt.sign({ userId: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
          });

          done(null, { token });
        } else {
          const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
          });
          done(null, { token });
        }

        // console.log(user);
      }
    )
  );

  app.get("/auth/google", passport.authenticate("google", { scope: ["profile"], session: false }));

  app.get("/auth/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
    // console.log(req.user);
    res.cookie("token", req.user.token, { sameSite: "none", secure: true, httpOnly: true }).redirect(`http://localhost:3000/profile`);
  });

  app.use("/api/v1", userRoutes);

  app.get("/test", async (req, res) => {
    res.cookie("testingCOOKIe", "12345", { sameSite: "none", secure: true, httpOnly: true }).redirect("http://localhost:3000");
  });

  //Error handling
  app.use(errorHandler);

  //Start the server
  const PORT = 5000;
  app.listen(PORT, async () => {
    try {
      await db.sync();
      console.log(`Server started on port ${PORT}`);
    } catch (err) {
      console.error("Unable to connect to the database : ", err);
    }
  });
})();
