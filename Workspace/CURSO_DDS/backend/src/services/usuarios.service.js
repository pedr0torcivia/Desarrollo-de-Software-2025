import { where } from "sequelize";
import { Op } from "sequelize";
import sequelize from "../databases/databases.js";

// Acá está la parte que interactúa con la base de datos usando Sequelize (se definen las funciones que se llaman desde el router)
// ASYNC, AWAIT: Se pone async para aclarar que es una funciona sincrona, y el await quiere decir (espera que termino de hacer esto y despues seguis )



// Consultar todos los usuarios 
const getAll = async () => {
    const allUsuarios = await sequelize.models.Usuarios.findAll();
    console.log("Usuarios obtenidos:", allUsuarios.map(u => u.dataValues)); // esto debería aparecer en consola
    return allUsuarios.map(usuario => usuario.dataValues)
}


// Buscar por ID
const getById = async (id) => {
    try {
        const usuario = await sequelize.models.Usuarios.findByPk(id);

        if (!usuario) {
            return null;
        }

        return usuario.dataValues;
    } catch (error) {
        console.error("Error al buscar usuario por ID:", error);
        return null;
    }
};



// Crear usuario
const createUser = async (body) => {
    const usuarioACrear = await sequelize.models.Usuarios.create({
        nombre: body.nombre,
        apellido: body.apellido,
        usuario: body.usuario,
        password: body.password,
        email: body.email
    })
    return usuarioACrear.dataValues
}

// Get by filter de usuario (filtro que sea por nombre y apellido)
const getByFilters = async (nombre, apellido) => {
    if (!nombre && !apellido) { // si no viene ningun filtro en el parametro, muestro todos los usaurios 
        return getAll()
    }

    // declaro un objeto de condiciones donde voy a ir almacenando los filtros 
    const whereConditions = {};

    // si viene el nombre en el parametro de la peticion, que me cree una condicion para buscar el nombre
    if (nombre) {
        whereConditions.nombre = { [Op.like]: `%${nombre}%` };
    }

    if (apellido) {
        whereConditions.apellido =  { [Op.like]: `%${apellido}%` };
    }

    // busco los usuarios en funcion de los filtros 
    const usersFiltrados = await sequelize.models.Usuarios.findAll({
        where: whereConditions
    })
    return usersFiltrados.map(user => user.dataValues)
}



// Eliminar usuario
const deleteUser = async (idUsuario) => {
    const deleted = await sequelize.models.Usuarios.destroy({
        where: { 
            id: idUsuario
        }
    });
    return deleted
};


// Modificar Usuario
const updateUser = async (idUsuario, body) => {
    try {
        const userToUpdate = await sequelize.models.Usuarios.findByPk(idUsuario);

        if (!userToUpdate) {
            return null;
        }

        userToUpdate.nombre = body.nombre;
        userToUpdate.apellido = body.apellido;
        userToUpdate.usuario = body.usuario;
        userToUpdate.password = body.password;
        userToUpdate.email = body.email;

        await userToUpdate.save();
        return userToUpdate.dataValues;

    } catch (error) {
        console.error("Error al actualizar:", error);
        return null;
    }
};



// Buscar por apelldio, que los ordene por nombre (alfabeticamente), que solo devuelva los dos primeros registros y que no incluya el password en la devolucion
const ejercicio = async (apellido) => {
    if (!apellido) {
        return await getAll()
    }

    const whereConditions = {};

    if (apellido) {
        whereConditions.apellido =  { [Op.like]: `%${apellido}%` };
    }

    const usuariosFiltrados = await sequelize.models.Usuarios.findAll({
        where: whereConditions,
        order: [["nombre","ASC"]], // ordenar por nombre ascendente ( si es necesaio se puede an agrega mas atributos=)
        limit: 2,
        attributes: {
            exclude: ["password"]
        }
    });
     // Si no hay resultados, devolvés un mensaje personalizado
    if (usuariosFiltrados.length === 0) {
        return { mensaje: "No se encontraron usuarios con ese apellido" };
    }

    return usuariosFiltrados.map(user => user.dataValues);
}





// Agrupar todos los servicios para exportarlos todos juntos 
const usersServices = {
    getAll,
    createUser,
    deleteUser,
    updateUser,
    getById,
    getByFilters,
    ejercicio

}


export { usersServices }