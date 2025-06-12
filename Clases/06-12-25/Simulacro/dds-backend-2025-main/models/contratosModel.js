const { DataTypes } = require('sequelize');
const sequelize = require('./configurarSequelize');

const Contrato = sequelize.define('Contrato', {
  IdContrato: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  NombreContrato: {
    type: DataTypes.STRING(70),
    allowNull: false,
    validate: {
      len: [5, 70]
    }
  },
  FechaInicio: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  FechaFin: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  ImporteMensual: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  TelefonoContacto: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'contratos',
  timestamps: false
});

module.exports = Contrato;
