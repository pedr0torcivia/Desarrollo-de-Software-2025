// src/app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './db.js';
import seguridadRouter from './routes/seguridad.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Middleware para parsear JSON y servir archivos públicos
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Rutas del backend
app.use('/api', seguridadRouter);

// Iniciar el servidor
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Base conectada');
    console.log(`🚀 Servidor en http://localhost:${PORT}`);
  } catch (error) {
    console.error('❌ Error conectando la base de datos:', error);
  }
});

export default app;
