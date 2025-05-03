// models/albumes.js
// Importa los tipos de datos que proporciona Sequelize
import { DataTypes } from "sequelize";

// Exporta una función que define el modelo de "Empresa"
export function defineEmpresaModel(sequelize) {
  // Devuelve la definición del modelo "Empresa" usando la instancia de Sequelize
  return sequelize.define("Empresa", {
    // Campo 'id': clave primaria, entero, se incrementa automáticamente
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Campo 'nombre': texto obligatorio, no puede estar vacío
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }, // Valida que no esté vacío
    },
    // Campo 'razonSocial': texto obligatorio, no puede estar vacío
    razonSocial: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }, // Valida que no esté vacío
    },
    // Campo 'tipoEmpresa': acepta solo ciertos valores, obligatorio
    tipoEmpresa: {
      type: DataTypes.ENUM("MICRO", "PEQUEÑA", "MEDIANA", "GRANDE"), // Solo estas opciones
      allowNull: false, // Es obligatorio
    },
    // Campo 'cantidadEmpleados': entero obligatorio, mínimo 1
    cantidadEmpleados: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1 }, // Debe ser al menos 1
    },
  }, {
    // Configuración adicional: no agrega campos createdAt ni updatedAt automáticamente
    timestamps: false,
  });
}
