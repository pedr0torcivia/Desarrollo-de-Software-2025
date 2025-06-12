// src/models/Producto.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
    IdProducto: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Nombre: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
    },
    Precio: {
        type: DataTypes.REAL,
        allowNull: false,
    },
    CodigoDeBarra: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    FechaAlta: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    tableName: 'productos',
    timestamps: false,  // Desactiva la creación automática de los campos createdAt y updatedAt
});

module.exports = Producto;
