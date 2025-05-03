// Conexion a base de datos 
import { DataTypes, Sequelize } from "sequelize"
import { TareasModel } from "../models/Tareas.js";
import { UsuariosModel } from "../models/Usuarios.js";


const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./db.sqlite"
})



// Vincular en base de datos
// sequelize.define(nombre, atributos, métodos)
sequelize.define("Tareas", TareasModel.tareasAttributes, TareasModel.tareasMethods);
sequelize.define("Usuarios", UsuariosModel.usuariosAttributes, UsuariosModel.usuariosMethods);

// Crear FKs (como user ID en la tabla tareas es una FK a la tabla usuarios )
sequelize.models.Tareas.belongsTo(sequelize.models.Usuarios, {
    foreignKey: "UsuarioId" });

export default sequelize