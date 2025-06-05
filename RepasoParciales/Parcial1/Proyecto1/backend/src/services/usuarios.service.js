// 19) Importar base de datos definida
import sequelize from "../databases/databases.js";
// Importar Operators especiales para consultas avanzadas
import { Op } from "sequelize";


// 20) Definir servicios

//Obtener todos los usuarios
const getAll = async () => { 
    const allUsuarios = await sequelize.models.Usuarios.findAll();
    return allUsuarios.map(usuario => usuario.dataValues)
}

const createUser = async (body) => {
    const usuarioACrear = await sequelize.models.Usuarios.create({
        nombre: body.nombre,
        apellido: body.apellido,
        usuario: body.usuario,
        password: body.password,
        email: body.email,     
    })
    return usuarioACrear.dataValues
}

const getById = async (id) => {
    const usuario = await sequelize.models.Usuarios.findByPk(id);
    if (!usuario) {
        throw new Error("Usuario no encontrado")
    }
    return usuario.dataValues
}

const getByFilter = async (filtro) => {
    const where = {};

    if (filtro.nombre) {
        where.nombre = { [Op.like]: `%${filtro.nombre}%` };
    }
    if (filtro.apellido) {
        where.apellido = { [Op.like]: `%${filtro.apellido}%` };
    }
    if (filtro.usuario) {
        where.usuario = { [Op.like]: `%${filtro.usuario}%` };
    }
    if (filtro.email) {
        where.email = { [Op.like]: `%${filtro.email}%` };
    }

    const usuarios = await sequelize.models.Usuarios.findAll({ where });
    return usuarios.map(usuario => usuario.dataValues);
};

const deleteUser = async (idUsuario) => {
    const usuarioABorrar = await sequelize.models.Usuarios.findByPk(idUsuario);
    if (!usuarioABorrar) {
        throw new Error("Usuario no encontrado");
    }
    // Eliminar el usuario especificando el ID
    await sequelize.models.Usuarios.destroy({
        where: { id: idUsuario }
    });
    return { mensaje: "Usuario eliminado correctamente" };
};


const updateUser = async (idUsuario, body) => {
    const usuario = await sequelize.models.Usuarios.findByPk(idUsuario)
    if (!usuario) {
        throw new Error("Usuario no encontrado")
    }
    usuario.nombre = body.nombre ?? usuario.nombre;
    usuario.apellido = body.apellido ?? usuario.apellido;
    usuario.usuario = body.usuario ?? usuario.usuario;
    usuario.password = body.password ?? usuario.password;
    usuario.email = body.email ?? usuario.email;

    await usuario.save()
    return usuario.dataValues

}

// buscar por apellido, ordenados por nombre alfabeticamente,
// solo devuelva los dos primeros registros y no incluya password
// de no encontrar, devolver todos 

const getByApellido = async (apellido) => {
    if (!apellido) {
        return await getAll()
    }
    const whereConditions = {};

    if (apellido) {
        whereConditions.apellido = { [Op.like]: `%${apellido}%`};
    }

    const usuariosFiltrados = await sequelize.models.Usuarios.findAll({
        where: whereConditions,
        order: [['nombre', 'ASC']],
        limit: 2,
        attributes: { exclude: ["password"]}
    })

    if (usuariosFiltrados.length === 0) {
        throw new Error("No hay usuarios que cumplan el filtro")
    }
    return usuariosFiltrados.map(usuario => usuario.dataValues)
    }


const userServices = {
    getAll,
    createUser,
    deleteUser,
    getById,
    getByFilter,
    updateUser,
    getByApellido
}

export default userServices;