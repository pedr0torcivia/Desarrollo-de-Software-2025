// backend/index.js

const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;

// --- Middlewares ---
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Permite leer JSON en las peticiones

// --- Configuración de Sequelize ---
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // Archivo SQLite donde se guardarán los datos
});

// --- Definición del modelo Country ---
const Country = sequelize.define('Country', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  flag: {
    type: DataTypes.STRING,
    allowNull: true
  },
  population: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  currency: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

// --- Sincronizar base de datos y hacer seeding ---
sequelize.sync({ force: true })
  .then(() => {
    console.log('Base de datos sincronizada.');
    return seedDatabase(); // Seeding después de sincronizar
  })
  .then(() => {
    // Iniciar servidor solo cuando la DB esté lista
    app.listen(port, () => {
      console.log(`Servidor escuchando en http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error('Error al iniciar la aplicación:', err);
  });

// --- Función de Seeding ---
async function seedDatabase() {
  try {
    const count = await Country.count();
    if (count === 0) {
      console.log('Insertando datos iniciales...');
      const latinAmericanCountries = [
        { name: 'Argentina', flag: 'https://flagcdn.com/ar.svg', population: 45376763, currency: 'ARS' },
        { name: 'Bolivia', flag: 'https://flagcdn.com/bo.svg', population: 11693337, currency: 'BOB' },
        { name: 'Brasil', flag: 'https://flagcdn.com/br.svg', population: 212559417, currency: 'BRL' },
        { name: 'Chile', flag: 'https://flagcdn.com/cl.svg', population: 19116209, currency: 'CLP' },
        { name: 'Colombia', flag: 'https://flagcdn.com/co.svg', population: 50882884, currency: 'COP' },
        { name: 'Ecuador', flag: 'https://flagcdn.com/ec.svg', population: 17643060, currency: 'USD' },
        { name: 'México', flag: 'https://flagcdn.com/mx.svg', population: 128932753, currency: 'MXN' },
        { name: 'Paraguay', flag: 'https://flagcdn.com/py.svg', population: 7132530, currency: 'PYG' },
        { name: 'Perú', flag: 'https://flagcdn.com/pe.svg', population: 32971846, currency: 'PEN' },
        { name: 'Uruguay', flag: 'https://flagcdn.com/uy.svg', population: 3473727, currency: 'UYU' }
      ];
      await Country.bulkCreate(latinAmericanCountries);
      console.log('Datos insertados correctamente.');
    } else {
      console.log('La base de datos ya contiene datos. Seeding no necesario.');
    }
  } catch (error) {
    console.error('Error durante el seeding:', error);
  }
}

// --- Rutas ---
app.get('/', (req, res) => {
  res.send('¡Backend de Países Funcionando!');
});

app.get('/api/countries', async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    console.error('Error al obtener países:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});
