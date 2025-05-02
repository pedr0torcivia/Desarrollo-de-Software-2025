// databases/db.js
import { Sequelize } from "sequelize";
import { definePacienteModel } from "../models/pacientes.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./databases/db.sqlite", // ajusta si cambia la ruta real
});

const PacienteModel = definePacienteModel(sequelize);

export { sequelize, PacienteModel };
