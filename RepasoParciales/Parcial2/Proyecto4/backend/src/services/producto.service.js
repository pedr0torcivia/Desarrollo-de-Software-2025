// 🔁 Modificable: lógica específica (filtros, ordenamientos)
const Producto = require('../models/Producto');

const create = (data) => Producto.create(data);
const findAll = async (search) => {
  const where = search ? { nombre: { [require('sequelize').Op.like]: `%${search}%` } } : {};
  return await Producto.findAll({ where });
};
const findByPk = (id) => Producto.findByPk(id);
const update = (id, data) => Producto.update(data, { where: { id } });
const destroy = (id) => Producto.destroy({ where: { id } });

module.exports = { create, findAll, findByPk, update, destroy };
