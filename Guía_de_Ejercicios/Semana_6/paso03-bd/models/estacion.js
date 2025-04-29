// models/estacion.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Estacion = sequelize.define("Estacion", {
    idEstacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    activa: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: "ESTACIONES",
    timestamps: false
});



export default Estacion;
