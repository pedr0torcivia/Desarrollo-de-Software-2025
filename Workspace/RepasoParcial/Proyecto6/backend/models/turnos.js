// models/albumes.js
// Importa los tipos de datos que proporciona Sequelize
import { DataTypes } from "sequelize";


// Definición del modelo Turno
export const defineTurnoModel = (sequelize) => {
  return sequelize.define("Turno", {
    idTurno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fechaTurno: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nombrePaciente: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    especialidad: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    medicoAsignado: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: false, // Desactiva createdAt y updatedAt
  });
};