// 19) Importar base de datos definida
import sequelize from "../databases/databases.js";


// 20) Definir servicios

//Obtener todos los usuarios
const getAll = async () => { 
    const allUsuarios = await sequelize.models.Usuarios.findAll();
    return allUsuarios.map(usuario => usuario.dataValues)
}

const createUser = () => {}
const deleteUser = () => {}

const userServices = {
    getAll,
    createUser,
    deleteUser
}

export {userServices}