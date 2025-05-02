import sequelize from "../databases/databases.js";
import { Op } from "sequelize";

const getAll = async () => { 
    const allTareas = await sequelize.models.Tareas.findAll();
    return allTareas.map(tarea => tarea.dataValues);
}

const createTarea = async (body) => {
    const tareaACrear = await sequelize.models.Tareas.create({
        descripcion: body.descripcion,
        UsuarioId: body.UsuarioId
    });
    return tareaACrear.dataValues;
}

const getById = async (id) => {
    const tarea = await sequelize.models.Tareas.findByPk(id);
    if (!tarea) {
        throw new Error("Tarea no encontrada");
    }
    return tarea.dataValues;
}

const getByFilter = async (filtro) => {
    const where = {};

    if (filtro.descripcion) {
        where.descripcion = { [Op.like]: `%${filtro.descripcion}%` };
    }
    if (filtro.UsuarioId) {
        where.UsuarioId = filtro.UsuarioId;
    }

    const tareas = await sequelize.models.Tareas.findAll({ where });
    return tareas.map(tarea => tarea.dataValues);
};

const deleteTarea = async (idTarea) => {
    const tareaABorrar = await sequelize.models.Tareas.findByPk(idTarea);
    if (!tareaABorrar) {
        throw new Error("Tarea no encontrada");
    }
    await sequelize.models.Tareas.destroy({ where: { id: idTarea } });
    return { mensaje: "Tarea eliminada correctamente" };
}

const updateTarea = async (idTarea, body) => {
    const tarea = await sequelize.models.Tareas.findByPk(idTarea);
    if (!tarea) {
        throw new Error("Tarea no encontrada");
    }

    tarea.descripcion = body.descripcion ?? tarea.descripcion;
    tarea.UsuarioId = body.UsuarioId ?? tarea.UsuarioId;

    await tarea.save();
    return tarea.dataValues;
};

const tareasServices = {
    getAll,
    createTarea,
    getById,
    getByFilter,
    deleteTarea,
    updateTarea
};

export default tareasServices;
