// src/app.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './db.js';
import localesRouter from './routes/locales.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use('/api/locales', localesRouter);

(async function start() {
    try {
        await sequelize.authenticate();
        console.log('🔌 Conexión a la base de datos establecida.');
        app.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('❌ No se pudo conectar a la base de datos:', error);
    }
})();
