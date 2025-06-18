// src/routes/libros.routes.js
const { Router } = require('express');
const service = require('../services/libros.service');
const router = Router();

router.get('/', async (req, res) => {
  try {
    const libros = await service.findAll(req.query.search);
    res.json(libros);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener libros' });
  }
});

router.get('/:id', async (req, res) => {
  const libro = await service.findById(req.params.id);
  libro ? res.json(libro) : res.status(404).json({ error: 'Libro no encontrado' });
});

router.post('/', async (req, res) => {
  try {
    const nuevo = await service.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear libro' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const actualizado = await service.update(req.params.id, req.body);
    actualizado
      ? res.status(200).json(actualizado)
      : res.status(404).json({ error: 'Libro no encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar libro' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const borrado = await service.remove(req.params.id);
    borrado
      ? res.status(200).json({ message: 'Eliminado correctamente' })
      : res.status(404).json({ error: 'Libro no encontrado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar libro' });
  }
});

module.exports = router;
