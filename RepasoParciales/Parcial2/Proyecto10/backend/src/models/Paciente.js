// backend/src/models/Paciente.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Paciente = sequelize.define("Paciente", {
  IdPaciente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  NombreMascota: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Propietario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Telefono: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Paciente;
