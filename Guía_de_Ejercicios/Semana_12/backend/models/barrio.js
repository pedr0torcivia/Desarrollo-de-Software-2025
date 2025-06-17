import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

//create table main.BARRIOS
// (
//     ID_BARRIO INTEGER
//         primary key autoincrement,
//     NOMBRE    VARCHAR2(100)
// );

class Barrio extends Model {}

Barrio.init(
  {
    idBarrio: {
      type: DataTypes.INTEGER,
      field: "ID_BARRIO",
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      field: "NOMBRE",
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 100],
          msg: "El nombre del barrio debe tener entre 3 y 100 caracteres",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Barrio",
    tableName: "BARRIOS",
    timestamps: false,
  }
);

export default Barrio;
