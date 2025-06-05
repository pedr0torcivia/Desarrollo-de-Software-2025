// Importamos la clase Sequelize desde el paquete 'sequelize'
// Esta clase nos permite configurar y manejar la base de datos
const { Sequelize } = require('sequelize');

// Creamos una nueva instancia de Sequelize, configurada para usar SQLite como motor de base de datos
const sequelize = new Sequelize({
  dialect: 'sqlite',              // Indicamos que el tipo de base de datos es SQLite
  storage: './database.sqlite'    // Ruta donde se almacenará el archivo de la base de datos
});

// Verificamos la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err);
  });


// Exportamos la instancia de Sequelize para poder usarla en otros archivos del proyecto
module.exports = sequelize;
