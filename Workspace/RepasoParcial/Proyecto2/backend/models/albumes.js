// models/albumes.js
import { DataTypes } from "sequelize";

export function defineAlbumModel(sequelize) {
  return sequelize.define("Album", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    artista: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    album: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    soporte: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    precio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 0 },
    },
  }, {
    timestamps: false,
  });
}
