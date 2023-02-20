const { Sequelize } = require("sequelize");

const db = new Sequelize("anonymous", "root", "jouter2407123#*", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
