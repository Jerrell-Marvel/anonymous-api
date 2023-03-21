const db = require("../db/connectDB");
const { DataTypes } = require("sequelize");
const User = require("./User.model");
const Message = require("./Message.model");
const Reply = db.define(
  "Reply",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reply: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
  }
);

Message.hasMany(Reply, { foreignKey: "message_id", as: "replies", onDelete: "CASCADE" });
Reply.belongsTo(Message, { foreignKey: "message_id" });

module.exports = Reply;
