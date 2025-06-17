// models/tarifa.js

import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

class Tarifa extends Model {}

Tarifa.init(
  {
    idTarifa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID_TARIFA"
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "DESCRIPCION"
    },
    tipoTarifa: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      field: "TIPO_TARIFA"
    },
    definicion: {
      type: DataTypes.STRING(1),
      defaultValue: "S",
      field: "DEFINICION"
    },
    diaSemana: {
      type: DataTypes.INTEGER,
      field: "DIA_SEMANA"
    },
    diaMes: {
      type: DataTypes.INTEGER,
      field: "DIA_MES"
    },
    mes: {
      type: DataTypes.INTEGER,
      field: "MES"
    },
    anio: {
      type: DataTypes.INTEGER,
      field: "ANIO"
    },
    montoFijoAlquiler: {
      type: DataTypes.REAL,
      field: "MONTO_FIJO_ALQUILER"
    },
    montoMinutoFraccion: {
      type: DataTypes.REAL,
      field: "MONTO_MINUTO_FRACCION"
    },
    montoKm: {
      type: DataTypes.REAL,
      field: "MONTO_KM"
    },
    montoHora: {
      type: DataTypes.REAL,
      field: "MONTO_HORA"
    }
  },
  {
    sequelize,
    modelName: "Tarifa",
    tableName: "TARIFAS",
    timestamps: false
  }
);

export default Tarifa;
