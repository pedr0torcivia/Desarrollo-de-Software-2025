const express = require('express');
const router = express.Router();
const service = require('../services/producto.service');

router.get('/', async (req, res) => res.json(await service.findAll(req.query.search)));
router.get('/:id', async (req, res) => res.json(await service.findByPk(req.params.id)));
router.post('/', async (req, res) => res.json(await service.create(req.body)));
router.put('/:id', async (req, res) => res.json(await service.update(req.params.id, req.body)));
router.delete('/:id', async (req, res) => res.json(await service.destroy(req.params.id)));

module.exports = router;
