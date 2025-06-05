// routes/Zapatillas.routes.js

import express from "express";
import zapatillasService from "../services/zapatillas.service.js";

const router = express.Router();

// GET /Zapatillas - Obtener todos los Zapatillas
router.get("/", async (req, res) => {
  try {
    const zapatillas = await zapatillasService.getAll();
    res.json(zapatillas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /Zapatillas/filtro?nombre=...&especialidad=... - Filtrar Zapatillas
router.get("/filtro", async (req, res) => {
  try {
    const { modelo, marca } = req.query;
    const zapatillas = await zapatillasService.getAllByFiltro({ modelo, marca });
    res.json(zapatillas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /Zapatillas - Crear nuevo Zapatilla
router.post("/", async (req, res) => {
  try {
    const nuevoZapatilla = await zapatillasService.create(req.body);
    res.status(201).json(nuevoZapatilla);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /Zapatillas/:id - Eliminar Zapatilla por ID
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await zapatillasService.remove(req.params.id);
    if (eliminado === 0) {
      res.status(404).json({ error: "Zapatilla no encontrada" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
