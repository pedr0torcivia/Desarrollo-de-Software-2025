// models/albumes.js
import { DataTypes } from "sequelize";

export function defineEmpresaModel(sequelize) {
  return sequelize.define("Empresa", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }, // No puede estar vacío
    },
    razonSocial: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }, // No puede estar vacío
    },
    tipoEmpresa: {
      type: DataTypes.ENUM("MICRO", "PEQUEÑA", "MEDIANA", "GRANDE"),
      allowNull: false, // Debe elegir un tipo válido
    },
    cantidadEmpleados: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 }, // Mínimo 1 empleado
    },
  }, {
    timestamps: false, // No se generan createdAt ni updatedAt
  });
}