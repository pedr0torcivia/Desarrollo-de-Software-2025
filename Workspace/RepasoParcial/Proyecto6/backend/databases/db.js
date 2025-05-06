// databases/db.js
// Importa Sequelize, el ORM (Object Relational Mapper) para manejar la base de datos
import { Sequelize } from "sequelize";

// Importa una función que define el modelo de Empresa
import { defineTurnoModel } from "../models/turnos.js";

// Crea una instancia de Sequelize configurada para usar SQLite como base de datos
const sequelize = new Sequelize({
  dialect: "sqlite", // Define que usará SQLite como motor de base de datos
  storage: "./databases/db.sqlite", // Ruta del archivo físico donde se guarda la base de datos
});

// Llama a la función que define el modelo de Empresa, pasándole la instancia de Sequelize
const TurnoModel = defineTurnoModel(sequelize);

// Exporta la conexión y el modelo para que puedan ser utilizados en otros archivos
export { sequelize, TurnoModel };
