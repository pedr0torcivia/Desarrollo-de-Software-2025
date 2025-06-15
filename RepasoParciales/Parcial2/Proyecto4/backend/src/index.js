// backend/src/index.js

const express = require('express');
const cors = require('cors');
const app = express();

// Importamos rutas
const productoRoutes = require('./routes/producto.routes');
const sequelize = require('./database/database');
const cargarDatosIniciales = require('./database/productosSeed'); // 👈 IMPORTAMOS

// Middlewares globales
app.use(cors());
app.use(express.json()); // Para leer JSON del body

// Montamos rutas
app.use('/api/productos', productoRoutes);

// Sincronizar modelos y levantar servidor
sequelize.sync({ alter: true }).then(async () => {
  console.log('📦 Base de datos sincronizada');

  await cargarDatosIniciales(); // 👈 CARGAMOS DATOS

  app.listen(3000, () => console.log('🚀 Servidor corriendo en http://localhost:3000'));
}).catch((err) => {
  console.error('❌ Error al sincronizar base:', err);
});