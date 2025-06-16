const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Deudor = sequelize.define('Deudor', {
  nombreCompleto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  importe: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  fechaDeuda: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fechaLimitePago: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
});

module.exports = Deudor;
