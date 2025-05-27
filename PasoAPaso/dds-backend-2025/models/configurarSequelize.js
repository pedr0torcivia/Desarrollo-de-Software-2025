const { Sequelize } = require('sequelize');

// Configuración de la base de datos SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './.data/database.sqlite', // Nombre del archivo de la base de datos  (ruta desde la raíz del proyecto)
  define: {
    freezeTableName: true,  // no pluraliza los nombres de las tablas, modelo = tabla
    timestamps: false,  // no crea campos de fecha de creación y modificación

  },
});


module.exports = sequelize;