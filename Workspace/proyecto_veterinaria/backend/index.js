// backend/index.js

const express = require('express');
const cors = require('cors'); // Se añade para permitir peticiones desde otros orígenes
const app = express();
const sequelize = require('./config/db');
const pacienteRoutes = require('./routes/pacienteRoutes');
const Paciente = require('./models/Paciente');

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS (importante si tu frontend se sirve desde otro puerto, por ejemplo, Live Server en 5500)
app.use(cors());

// Ruta base para la API
app.use('/api/pacientes', pacienteRoutes);

// Sincroniza la base de datos y carga datos iniciales (seeding)
sequelize.sync({ force: true }).then(async () => {
  console.log("Base de datos sincronizada.");

  // Seeding: carga algunos datos de ejemplo si la tabla está vacía
  const count = await Paciente.count();
  if (count === 0) {
    await Paciente.bulkCreate([
      { NombreMascota: "Firulais", Propietario: "Juan Perez", Telefono: "123456789" },
      { NombreMascota: "Pelusa", Propietario: "María López", Telefono: "987654321" },
      { NombreMascota: "Rex", Propietario: "Carlos Gómez", Telefono: "5555555" }
    ]);
    console.log("Datos iniciales cargados.");
  }

  // Inicia el servidor en el puerto 3000
  app.listen(3000, () => {
    console.log("Servidor corriendo en el puerto 3000");
  });
}).catch((error) => {
  console.error("Error al sincronizar la base de datos:", error);
});

