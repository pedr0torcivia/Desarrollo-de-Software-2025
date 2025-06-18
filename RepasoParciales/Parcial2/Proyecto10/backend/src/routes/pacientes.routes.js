// backend/src/routes/pacientes.routes.js
const { Router } = require("express");
const service = require("../services/paciente.service");

const router = Router();

router.get("/", async (req, res) => {
  const propietario = req.query.propietario;
  const data = await service.findAll(propietario);
  res.json(data);
});

router.get("/:id", async (req, res) => {
  const paciente = await service.findByPk(req.params.id);
  if (paciente) res.json(paciente);
  else res.status(404).json({ error: "Paciente no encontrado" });
});

router.post("/", async (req, res) => {
  const paciente = await service.create(req.body);
  res.status(201).json(paciente);
});

router.put("/:id", async (req, res) => {
  await service.update(req.params.id, req.body);
  res.sendStatus(204);
});

router.delete("/:id", async (req, res) => {
  await service.destroy(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
