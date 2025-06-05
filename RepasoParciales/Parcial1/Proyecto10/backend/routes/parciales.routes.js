import express from "express";
import parcialesService from "../services/parciales.service.js";

const router = express.Router();

// Obtener todos los parciales
router.get("/", async (req, res) => {
  try {
    const parciales = await parcialesService.getAll();
    res.json(parciales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Filtro por legajo
router.get("/filtro", async (req, res) => {
  try {
    const { legajo } = req.query;
    const parciales = await parcialesService.getAllByLegajo(legajo);
    res.json(parciales);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Crear nuevo parcial
router.post("/", async (req, res) => {
  try {
    const nuevoParcial = await parcialesService.create(req.body);
    res.status(201).json(nuevoParcial);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar parcial por legajo
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await parcialesService.remove(req.params.id);
    if (eliminado === 0) {
      res.status(404).json({ error: "Parcial no encontrado" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
