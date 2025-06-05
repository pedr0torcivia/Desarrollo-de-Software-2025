// Importamos Express, el framework para manejar el servidor HTTP
const express = require('express');

// Importamos CORS para permitir que otros orígenes (como el frontend en otro puerto) accedan a este servidor
const cors = require('cors');

// Creamos una instancia de la aplicación Express
const app = express();

// Importamos la instancia de Sequelize que conecta con la base de datos SQLite
const sequelize = require('./config/db');

// Importamos las rutas definidas para los pacientes
const pacienteRoutes = require('./routes/pacienteRoutes');

// Importamos el modelo Paciente para hacer operaciones directamente sobre él
const Paciente = require('./models/paciente');


// Middleware para que Express entienda los cuerpos de las peticiones en formato JSON
app.use(express.json());

// Habilitamos CORS: necesario para que el frontend (por ejemplo, en http://localhost:5500) pueda comunicarse con el backend
app.use(cors());

// Definimos la ruta base para acceder a las rutas de pacientes
// Por ejemplo, una petición a /api/pacientes va a buscar en pacienteRoutes
app.use('/api/pacientes', pacienteRoutes);


// Sincroniza el modelo con la base de datos
// force: true elimina y recrea todas las tablas (útil para desarrollo)
// sequelize.sync({ force: true }).then(async () => {
  sequelize.sync().then(async () => { // No elimina datos ni recrea las tablas
  console.log("Base de datos sincronizada.");

  // Contamos cuántos pacientes hay en la tabla
  const count = await Paciente.count();

  // Si no hay ninguno, cargamos datos de prueba (seeding)
  if (count === 0) {
    await Paciente.bulkCreate([
      { NombreMascota: "Firulais", Propietario: "Juan Perez", Telefono: "123456789" },
      { NombreMascota: "Pelusa", Propietario: "María López", Telefono: "987654321" },
      { NombreMascota: "Rex", Propietario: "Carlos Gómez", Telefono: "5555555" }
    ]);
    console.log("Datos iniciales cargados.");
  }

  // Iniciamos el servidor escuchando en el puerto 3000
  app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
  });
  
}).catch((error) => {
  // Si ocurre un error durante la sincronización, lo mostramos por consola
  console.error("Error al sincronizar la base de datos:", error);
});