// 🔁 Modificable: podés cambiar nombre de entidad o atributos
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Producto = sequelize.define('Producto', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  precio: { type: DataTypes.FLOAT, allowNull: false, validate: { min: 0.01 } },
  stock: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
  fechaAlta: { type: DataTypes.DATEONLY, allowNull: false }
});

module.exports = Producto;
