// Importamos el tipo de datos de Sequelize que usaremos para definir los campos
const { DataTypes } = require('sequelize');

// Importamos la instancia de conexión a la base de datos previamente configurada
const sequelize = require('../config/db');

// Definición del modelo Paciente asociado a la base de datos
// Sequelize se encargará de mapear este modelo a una tabla 'Pacientes' (nombre en plural por convención)
const Paciente = sequelize.define('Paciente', {
  // Definimos el campo IdPaciente como clave primaria autoincremental
  IdPaciente: {
    type: DataTypes.INTEGER,      // Tipo entero
    autoIncrement: true,          // Se incrementa automáticamente en cada inserción
    primaryKey: true,             // Clave primaria de la tabla
    allowNull: false              // No se permite que esté vacío (nulo)
  },
  // Campo que representa el nombre de la mascota
  NombreMascota: {
    type: DataTypes.STRING,       // Cadena de texto (varchar)
    allowNull: false              // Este campo es obligatorio
  },
  // Campo con el nombre del propietario de la mascota
  Propietario: {
    type: DataTypes.STRING,       // Cadena de texto
    allowNull: false              // También obligatorio
  },
  // Campo opcional para el número de teléfono del propietario
  Telefono: {
    type: DataTypes.STRING,       // Cadena de texto (en vez de número, para soportar guiones, paréntesis, etc.)
    allowNull: true               // Puede quedar vacío (opcional)
  }
}, {
  // Configuración adicional del modelo
  timestamps: false               // No se crearán automáticamente los campos 'createdAt' y 'updatedAt'
});

// Exportamos el modelo para poder usarlo en rutas, controladores, etc.
module.exports = Paciente;
