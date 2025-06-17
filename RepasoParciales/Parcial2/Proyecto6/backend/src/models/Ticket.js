// backend/src/models/Ticket.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Ticket = sequelize.define('Ticket', {
  idTicket: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreTarea: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  prioridad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 10
    }
  }
}, {
  tableName: 'tickets',
  timestamps: false
});

module.exports = Ticket;
