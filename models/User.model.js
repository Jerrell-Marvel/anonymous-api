const db = require("../db/connectDB");
const { DataTypes } = require("sequelize");
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
    instagram: {
      type: DataTypes.STRING,
    },
    twitter: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
