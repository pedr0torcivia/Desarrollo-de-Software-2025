// Configura Sequelize para usar SQLite como base de datos local
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './src/database/libros.db'
});

module.exports = sequelize;
