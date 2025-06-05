// models/zapatilla.js
// Importa los tipos de datos que proporciona Sequelize
import { DataTypes } from "sequelize";


// Definición del modelo Zapatilla
export const defineZapatillaModel = (sequelize) => {
  return sequelize.define("Zapatilla", {
    // ID autoincremental como clave primaria
    idZapatilla: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Marca de la zapatilla, obligatoria, máximo 30 caracteres
    marca: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    // Modelo de la zapatilla, obligatorio, máximo 50 caracteres
    modelo: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    // Talle como número entero obligatorio
    talle: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Precio como decimal obligatorio
    precio: {
      type: DataTypes.DECIMAL(10, 2), // Ej: 4999.99
      allowNull: false,
    },
    // Stock como número entero obligatorio
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: false // No crea createdAt ni updatedAt
  });
};