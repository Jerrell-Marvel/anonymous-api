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

require("dotenv").config();

(async function main() {
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000", "127.0.0.1:5500", "192.168.0.182:3000"],
    })
  );
  app.use(cookieParser());
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // find or create a user in your database using the profile information
        // call done with the user object
        // const user = await User.create({
        //   id: profile.id,
        //   name: profile.id,
        // })

        console.log(profile.emails);
        const user = await User.findOne({
          where: {
            id: profile.id,
          },
        });

        if (!user) {
          const addedUser = await User.create({
            id: profile.id,
            username: profile.id,
          });

          const { username, id } = addedUser.dataValues;
          const token = jwt.sign({ username, userId: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
          });

          done(null, { username: addedUser.dataValues.username, token });
        } else {
          const token = jwt.sign({ username: user.username, userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
          });
          done(null, { username: user.username, token });
        }

        // console.log(user);
      }
    )
  );

  app.get("/auth/google", passport.authenticate("google", { scope: ["profile"], session: false }));

  app.get("/auth/google/callback", passport.authenticate("google", { session: false }), (req, res) => {
    // console.log(req.user);
    res.cookie("token", req.user.token, { sameSite: "none", secure: true, httpOnly: true }).redirect(`http://localhost:3000/profile`);
    //   console.log(res);
  });

  app.use("/api/v1", userRoutes);

  app.get("/test", async (req, res) => {
    res.cookie("testingCOOKIe", "12345", { sameSite: "none", secure: true, httpOnly: true }).redirect("http://localhost:3000");
  });

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
