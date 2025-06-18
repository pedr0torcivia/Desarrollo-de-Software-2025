// src/models/Libro.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Libro = sequelize.define('Libro', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: 'IdLibro'
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
    type: DataTypes.INTEGER
  }
});

module.exports = Libro;
