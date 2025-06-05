// models/zapatilla.js
// Importa los tipos de datos que proporciona Sequelize
import { DataTypes } from "sequelize";


// Definición del modelo Zapatilla
export const defineParcialModel = (sequelize) => {
  return sequelize.define("Parcial", {
    // ID autoincremental como clave primaria
    legajoAlumno: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    // Marca de la zapatilla, obligatoria, máximo 30 caracteres
    nombreAlumno: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    // Modelo de la zapatilla, obligatorio, máximo 50 caracteres
    apellidoAlumno: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    // Marca de la zapatilla, obligatoria, máximo 30 caracteres
    materia: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    nota: {
      type: DataTypes.DECIMAL(3, 1), // por ejemplo 7.8
      allowNull: true,
    }
  }, {
    timestamps: false // No crea createdAt ni updatedAt
  });
};