// services/turnos.service.js

import { TurnoModel } from "../databases/db.js";
import { Op } from "sequelize";

// Servicio para operaciones sobre Turno
const turnosService = {
  // 1. Obtener todos los turnos
  async getAll() {
    return await TurnoModel.findAll(); // SELECT * FROM Turnos
  },

  // 2. Obtener turnos filtrando por nombre del paciente y/o especialidad
  async getAllByFiltro({ nombre, especialidad }) {
    const where = {};

    // Si se envía el nombre, se filtra por coincidencia inicial (LIKE 'nombre%')
    if (nombre) {
      where.nombrePaciente = { [Op.like]: `${nombre}%` };
    }

    // Si se envía la especialidad, se filtra por coincidencia exacta
    if (especialidad) {
      where.especialidad = especialidad;
    }

    return await TurnoModel.findAll({ where });
  },

  // 3. Crear nuevo turno
  async create(data) {
    if (
      !data.fechaTurno ||
      !data.nombrePaciente ||
      !data.especialidad ||
      !data.medicoAsignado ||
      !data.estado
    ) {
      throw new Error("Faltan campos obligatorios.");
    }

    return await TurnoModel.create(data);
  },

  // 4. Eliminar turno por ID
  async remove(id) {
    const turno = await TurnoModel.findByPk(id);
    if (!turno) return 0;

    await turno.destroy();
    return 1;
  }
};

export default turnosService;
