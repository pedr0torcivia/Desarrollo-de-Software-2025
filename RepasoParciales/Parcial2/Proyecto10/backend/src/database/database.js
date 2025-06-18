// backend/src/database/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
storage: __dirname + "/veterinaria.db",
  logging: false
});

module.exports = sequelize;
