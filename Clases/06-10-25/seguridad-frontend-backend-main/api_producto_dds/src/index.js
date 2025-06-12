const express = require('express');
const { keycloak } = require('./config/keycloak');
const productosRoutes = require('./routes/productosRoute');
const sequelize = require('./config/database');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(cors());  // Habilita CORS para todas las rutas

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Middleware de Keycloak
app.use(keycloak.middleware());

// Configuración de Sequelize
sequelize.sync()
    .then(() => console.log('Database synced'))
    .catch(err => console.error('Database sync failed:', err));

// Configuración de las rutas
app.use('/productos', productosRoutes);

// Middleware de manejo de errores personalizado
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


module.exports = app;
