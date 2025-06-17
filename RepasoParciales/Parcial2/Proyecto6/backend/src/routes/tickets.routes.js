// backend/src/routes/tickets.routes.js
const express = require('express');
const router = express.Router();
const ticketService = require('../services/ticket.service');

// GET /api/tickets
router.get('/api/tickets', async (req, res) => {
  try {
    const tickets = await ticketService.findAll();
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tickets' });
  }
});

// POST /api/tickets
router.post('/api/tickets', async (req, res) => {
  try {
    const nuevoTicket = await ticketService.create(req.body);
    res.status(201).json(nuevoTicket);
  } catch (error) {
    res.status(400).json({ error: 'Datos inválidos', detalles: error.message });
  }
});

module.exports = router;
