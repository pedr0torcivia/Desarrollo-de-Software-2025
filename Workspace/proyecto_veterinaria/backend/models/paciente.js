// backend/models/Paciente.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

// Definición del modelo Paciente
const Paciente = sequelize.define('Paciente', {
  IdPaciente: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  NombreMascota: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Propietario: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Telefono: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  timestamps: false
});

module.exports = Paciente;
