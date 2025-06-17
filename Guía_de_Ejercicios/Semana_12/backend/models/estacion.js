import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
import Barrio from "./barrio.js"; // Vamos a necesitar importar el modelo Barrio

class Estacion extends Model {}

Estacion.init(
  {
    idEstacion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID_ESTACION"
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: "NOMBRE"
    },
    direccion: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: "DIRECCION"
    },
    idBarrio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "ID_BARRIO"
    },
    fechaHoraCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "FECHA_HORA_CREACION"
    },
    latitud: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "LATITUD"
    },
    longitud: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: "LONGITUD"
    },
    activa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      field: "ACTIVA"
    }
  },
  {
    sequelize,
    modelName: "Estacion",
    tableName: "ESTACIONES",
    timestamps: false
  }
);

// Definición de la relación entre Estacion y Barrio
// Una estación pertenece a un barrio
Estacion.belongsTo(Barrio, {
  foreignKey: {
    name: "idBarrio",
    field: "ID_BARRIO"
  },
  as: "barrio"
});

// Definición de la relación entre Barrio y Estacion
// Un barrio puede tener muchas estaciones
Barrio.hasMany(Estacion, {
  foreignKey: {
    name: "idBarrio",
    field: "ID_BARRIO"
  },
  as: "estaciones"
});

export default Estacion;
