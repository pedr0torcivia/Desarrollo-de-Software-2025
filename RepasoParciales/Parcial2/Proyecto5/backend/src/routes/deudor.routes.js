const express = require('express');
const router = express.Router();
const service = require('../services/deudor.service');

// Crear nuevo deudor
router.post('/deudores', async (req, res) => {
  try {
    const nuevo = await service.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los deudores
router.get('/deudores', async (_req, res) => {
  try {
    const lista = await service.findAll();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
