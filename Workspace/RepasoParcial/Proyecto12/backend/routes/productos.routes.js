import express from "express";
import {
  getProductosDisponibles,
  getProductosPorNombre,
  crearProducto
} from "../services/productos.service.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { nombre } = req.query;

  try {
    if (nombre) {
      const filtrados = await getProductosPorNombre(nombre);
      res.json(filtrados);
    } else {
      const disponibles = await getProductosDisponibles();
      res.json(disponibles);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const nuevo = await crearProducto(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
