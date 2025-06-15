const Libro = require('../models/Libro');
const { Op } = require('sequelize');

async function getAllLibros(search) {
  let condition = {};
  if (search) {
    condition = {
      Titulo: {
        [Op.like]: `%${search}%`
      }
    };
  }
  return await Libro.findAll({ where: condition });
}

async function getLibroById(id) {
  return await Libro.findByPk(id);
}

async function createLibro(data) {
  return await Libro.create(data);
}

async function updateLibro(id, data) {
  const libro = await Libro.findByPk(id);
  if (libro) {
    return await libro.update(data);
  }
  return null;
}

async function deleteLibro(id) {
  const libro = await Libro.findByPk(id);
  if (libro) {
    return await libro.destroy();
  }
  return null;
}

module.exports = {
  getAllLibros,
  getLibroById,
  createLibro,
  updateLibro,
  deleteLibro
};
