// src/database/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './libros.sqlite'
});

module.exports = sequelize;
