// models/albumes.js
// Importa los tipos de datos que proporciona Sequelize
import { DataTypes } from "sequelize";

// Exporta una función que define el modelo de "Paciente"
export function definePacienteModel(sequelize) {
  // Devuelve la definición del modelo "Paciente" usando la instancia de Sequelize
  return sequelize.define("Paciente", {
    // Campo 'id': clave primaria, entero, se incrementa automáticamente
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false, 
    },
    // Campo 'nombre': texto obligatorio, no puede estar vacío
    nombreMascota: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }, // Valida que no esté vacío
    },
    // Campo 'paciente': texto obligatorio, no puede estar vacío
    propietario: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true }, // Valida que no esté vacío
    },

    // Campo 'telego': entero no obligatorio,
    telefono: {
      type:DataTypes.INTEGER,
      allowNull: true,
        },
  }, {
    // Configuración adicional: no agrega campos createdAt ni updatedAt automáticamente
    timestamps: false,
  });
}
