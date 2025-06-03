import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Usuario = sequelize.define('Usuario', {
  usuario: { type: DataTypes.STRING, primaryKey: true },
  clave: DataTypes.STRING,
  rol: DataTypes.STRING
}, {
  tableName: 'usuarios', // 🔧 en minúscula, igual que en SQLite
  timestamps: false
});

export default Usuario;
