const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./database/database');
const deudorRoutes = require('./routes/deudor.routes');
const Deudor = require('./models/Deudor');


app.use(cors());
app.use(express.json());
app.use('/api', deudorRoutes);

// Inicializa la BD y levanta el servidor
sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
});
