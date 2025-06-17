import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

class Alquiler extends Model {}

Alquiler.init({
    idAlquiler: {
        type: DataTypes.INTEGER,
        field: "ID",
        primaryKey: true,
        autoIncrement: true,
    },
    idEstacionRetiro: {
        type: DataTypes.INTEGER,
        field: "ID_ESTACION_RETIRO",
        allowNull: false,
    },
    idEstacionDevolucion: {
        type: DataTypes.INTEGER,
        field: "ID_ESTACION_DEVOLUCION",
        allowNull: false,
    },
    idCliente: {
        type: DataTypes.INTEGER,
        field: "ID_CLIENTE",
        allowNull: false,
    },
    fechaRetiro: {
        type: DataTypes.DATE,
        field: "FECHA_HORA_RETIRO",
        allowNull: false,
    },
    fechaDevolucion: {
        type: DataTypes.DATE,
        field: "FECHA_HORA_DEVOLUCION",
        allowNull: false,
    },
    monto: {
        type: DataTypes.DECIMAL(10, 2),
        field: "MONTO",
        allowNull: false,
    },
    idTarifa: {
        type: DataTypes.INTEGER,
        field: "ID_TARIFA",
        allowNull: false,
    },
    estado: {
        type: DataTypes.STRING,
        field: "ESTADO",
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "Alquiler",
    tableName: "ALQUILERES",
    timestamps: false,
})

export default Alquiler;