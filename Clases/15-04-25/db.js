const { Sequelize } = 
require("sequelize");
const { isModuleNamespaceObject } = require("util/types");
const sequelize = new
Sequelize ( {
    dialecr: "sqlite",
    host: "./usuarios.db",
});

module.exports = sequelize; 

const sequelize = require("./db");
async function testConnection() {
    try {
        await sequelize.sync().then(() => console.log("BD ok"));
        // await sequelize.authenticate();
        // console.log("Conexión exitosa.");
    } catch(error) {
        console.error("Error al conectar a la BD", error)
    }
}

module.exports = {testConnection}