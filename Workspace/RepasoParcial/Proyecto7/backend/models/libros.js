// models/libros.js
import { DataTypes } from "sequelize";

export function defineLibroModel(sequelize) {
  return sequelize.define("Libro", {
    IdLibro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Autor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    AnioPublicacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  }, {
    timestamps: false
  });
}
