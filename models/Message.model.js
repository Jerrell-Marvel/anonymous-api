const db = require("../db/connectDB");
const { DataTypes } = require("sequelize");
const User = require("./User.model");
const Message = db.define(
  "Message",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Message, { foreignKey: "user_id", as: "messages" });
Message.belongsTo(User, { foreignKey: "user_id" });

module.exports = Message;
