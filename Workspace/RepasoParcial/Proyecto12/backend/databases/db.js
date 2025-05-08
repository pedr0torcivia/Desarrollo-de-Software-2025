import { Sequelize } from "sequelize";
import { defineProductoModel } from "../models/productos.js";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./base.db",
  logging: false,
});

export const ProductoModel = defineProductoModel(sequelize);
