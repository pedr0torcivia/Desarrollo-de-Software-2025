import { DataTypes } from "sequelize";

export function defineProductoModel(sequelize) {
  return sequelize.define("Producto", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    marca: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "",
    },
    tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: [[1, 2, 3, 4]],
      },
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    aReponer: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "N",
      validate: {
        isIn: [["S", "N"]],
      },
    },
  });
}
