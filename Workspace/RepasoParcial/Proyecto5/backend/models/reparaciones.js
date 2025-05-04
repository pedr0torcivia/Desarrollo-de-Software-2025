// models/albumes.js
// Importa los tipos de datos que proporciona Sequelize
import { DataTypes } from "sequelize";

// Exporta una función que define el modelo de "Empresa"
export function defineReparacionModel(sequelize) {
  // Devuelve la definición del modelo "Empresa" usando la instancia de Sequelize
  return sequelize.define("Reparacion", {
    // Clave primaria autoincremental
    idReparacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Fecha de recepción, obligatoria
    fechaRecepcion: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    // Nombre del cliente, string obligatorio, máximo 50 caracteres
    nombreCliente: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true, // No puede estar vacío
      },
    },
    // Tipo de equipo, string obligatorio, máximo 30 caracteres
    tipoEquipo: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        notEmpty: true, // No puede estar vacío
      },
    },
    // Descripción del problema, campo de texto obligatorio
    descripcionProblema: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true, // No puede estar vacío
      },
    },
    // Estado del equipo, string obligatorio, máximo 25 caracteres
    estado: {
      type: DataTypes.STRING(25),
      allowNull: false,
      validate: {
        notEmpty: true, // No puede estar vacío
      },
    },
    // Costo estimado, decimal, puede ser nulo
    costoEstimado: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    // Campo booleano que indica si fue pagado, no nulo, por defecto false
    pagado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    timestamps: false, // Desactiva createdAt y updatedAt
  });
}
