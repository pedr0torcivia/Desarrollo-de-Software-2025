// Define el modelo de Libro con Sequelize
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Libro = sequelize.define('Libro', {
  IdLibro: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  Titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Autor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  AnioPublicacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Libros',
  timestamps: false
});

module.exports = Libro;
