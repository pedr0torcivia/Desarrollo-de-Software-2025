// backend/src/services/paciente.service.js
const Paciente = require("../models/Paciente");
const { Op } = require("sequelize");

async function findAll(propietario) {
  const where = propietario ? {
    Propietario: { [Op.like]: `%${propietario}%` }
  } : {};
  return await Paciente.findAll({ where, order: [['IdPaciente', 'DESC']] });
}

async function findByPk(id) {
  return await Paciente.findByPk(id);
}

async function create(paciente) {
  return await Paciente.create(paciente);
}

async function update(id, paciente) {
  return await Paciente.update(paciente, { where: { IdPaciente: id } });
}

async function destroy(id) {
  return await Paciente.destroy({ where: { IdPaciente: id } });
}

module.exports = { findAll, findByPk, create, update, destroy };
