const express = require('express');
const router = express.Router();
const service = require('../services/libros.service');

router.get('/', async (req, res) => {
  const libros = await service.getAllLibros(req.query.search);
  res.json(libros);
});

router.get('/:id', async (req, res) => {
  const libro = await service.getLibroById(req.params.id);
  libro ? res.json(libro) : res.status(404).send();
});

router.post('/', async (req, res) => {
  const libro = await service.createLibro(req.body);
  res.status(201).json(libro);
});

router.put('/:id', async (req, res) => {
  const updated = await service.updateLibro(req.params.id, req.body);
  updated ? res.json(updated) : res.status(404).send();
});

router.delete('/:id', async (req, res) => {
  const deleted = await service.deleteLibro(req.params.id);
  deleted ? res.status(204).send() : res.status(404).send();
});

module.exports = router;
