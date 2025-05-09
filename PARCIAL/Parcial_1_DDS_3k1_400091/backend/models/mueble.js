import { DataTypes } from 'sequelize'; // Importa los tipos de datos de Sequelize
import { sequelize } from '../databases/db.js'; // Importa la instancia de conexión a la base de datos

// Define el modelo "Mueble" utilizando Sequelize
export const Mueble = sequelize.define('Mueble', {
    // Define la columna "IdMueble" como clave primaria con autoincremento
    IdMueble: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    // Define la columna "Nombre" como un string obligatorio
    Nombre: { type: DataTypes.STRING, allowNull: false },
    // Define la columna "Material" como un string obligatorio
    Material: { type: DataTypes.STRING, allowNull: false },
    // Define la columna "FechaFabricacion" como una fecha opcional
    FechaFabricacion: { type: DataTypes.DATEONLY, allowNull: true },
    // Define la columna "PrecioEstimado" como un decimal opcional con precisión (10, 2)
    PrecioEstimado: { type: DataTypes.DECIMAL(10, 2), allowNull: true }
}, {
    // Desactiva la creación automática de columnas "createdAt" y "updatedAt"
    timestamps: false
});

