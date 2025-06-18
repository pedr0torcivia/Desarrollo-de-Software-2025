// src/services/libros.service.js
const { Op } = require('sequelize');
const Libro = require('../models/Libro');

async function findAll(search) {
  if (search) {
    return await Libro.findAll({
      where: {
        [Op.or]: [
          { Titulo: { [Op.like]: `%${search}%` } },
          { Autor: { [Op.like]: `%${search}%` } }
        ]
      }
    });
  }
  return await Libro.findAll();
}

async function findById(id) {
  return await Libro.findByPk(id);
}

async function create(libroData) {
  return await Libro.create(libroData);
}

async function update(id, datos) {
  const libro = await Libro.findByPk(id);
  if (!libro) return null;
  await libro.update(datos);
  return libro;
}

async function remove(id) {
  return await Libro.destroy({ where: { id } });
}

module.exports = { findAll, findById, create, update, remove };
