const db = require("../db/connectDB");
const { DataTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const User = db.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },

    username: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

User.beforeCreate(async (user, options) => {
  const randomNum = Math.floor(Math.random() * 100);
  const randomizedName = user.id.slice(0, 5) + randomNum;
  user.username = randomizedName;
});

module.exports = User;
