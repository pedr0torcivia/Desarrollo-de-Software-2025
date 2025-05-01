import { Sequelize } from "sequelize"; // 14) Importar sequelize y modelos
import {TareasModel} from "../models/Tareas.js"
import {UsuariosModel} from "../models/Usuarios.js"

// 15) Indicar DBMS y ubicación en disco de db.sqlite. 
const sequelize = new Sequelize ({
    dialect: "sqlite", // Motor de base de datos
    storage: "src/db.sqlite"
})

// 16) sequelize.define(nombre, atributos, metodos)
sequelize.define("Tareas", TareasModel.tareasAttributes, TareasModel.tareasMethods)
sequelize.define("Usuarios", UsuariosModel.usuariosAttributes, UsuariosModel.usuariosMethods)
console.log("Base de datos conectada")
// 17) Crear FKS entre tablas
sequelize.models.Tareas.belongsTo(sequelize.models.Usuarios, {foreignKey: "UsuarioID"})

// 18) Exportar modelo 
export default sequelize;