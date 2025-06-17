// backend/src/services/ticketService.js
const Ticket = require('../models/Ticket');

async function findAll() {
  return await Ticket.findAll({ order: [['idTicket', 'ASC']] });
}

async function create(data) {
  return await Ticket.create(data);
}

module.exports = {
  findAll,
  create
};
