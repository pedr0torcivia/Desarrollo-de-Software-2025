const Deudor = require('../models/Deudor');

module.exports = {
  async create(data) {
    return await Deudor.create(data);
  },
  async findAll() {
    return await Deudor.findAll();
  }
};
