import { Sequelize } from 'sequelize';
import path from 'path';
import fs from 'fs';
import defineReserva from '../models/Reserva.js';

// 📦 Aseguramos que exista la carpeta de la DB
const dbPath = path.resolve("src", "database", "reservas.db");
const dbDir = path.dirname(dbPath);
if (!fs.existsSync(dbDir)) fs.mkdirSync(dbDir, { recursive: true });

// Inicializamos Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbPath,
  logging: false,
});

// Registramos el modelo
defineReserva(sequelize);

export default sequelize;
