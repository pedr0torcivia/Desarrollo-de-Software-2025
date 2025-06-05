// databases/db.js
import { Sequelize } from "sequelize";
import { defineAlbumModel } from "../models/albumes.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./databases/db.sqlite", // ajusta si cambia la ruta real
});

const AlbumModel = defineAlbumModel(sequelize);

export { sequelize, AlbumModel };
