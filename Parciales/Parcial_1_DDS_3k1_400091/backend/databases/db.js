// Importa el módulo Sequelize, que es un ORM (Object-Relational Mapping)
//  para interactuar con bases de datos.
import { Sequelize } from 'sequelize';


// Crea una instancia de Sequelize configurada para usar SQLite como base de datos.
export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './muebles.sqlite'
});
