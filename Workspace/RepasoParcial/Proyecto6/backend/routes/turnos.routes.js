// routes/turnos.routes.js

import express from "express";
import turnosService from "../services/turnos.service.js";

const router = express.Router();

// GET /turnos - Obtener todos los turnos
router.get("/", async (req, res) => {
  try {
    const turnos = await turnosService.getAll();
    res.json(turnos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /turnos/filtro?nombre=...&especialidad=... - Filtrar turnos
router.get("/filtro", async (req, res) => {
  try {
    const { nombre, especialidad } = req.query;
    const turnos = await turnosService.getAllByFiltro({ nombre, especialidad });
    res.json(turnos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /turnos - Crear nuevo turno
router.post("/", async (req, res) => {
  try {
    const nuevoTurno = await turnosService.create(req.body);
    res.status(201).json(nuevoTurno);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /turnos/:id - Eliminar turno por ID
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await turnosService.remove(req.params.id);
    if (eliminado === 0) {
      res.status(404).json({ error: "Turno no encontrado" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
