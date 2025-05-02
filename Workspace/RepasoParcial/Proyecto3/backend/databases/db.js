// databases/db.js
import { Sequelize } from "sequelize";
import { defineEmpresaModel } from "../models/empresas.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./databases/db.sqlite", // ajusta si cambia la ruta real
});

const EmpresaModel = defineEmpresaModel(sequelize);

export { sequelize, EmpresaModel };
