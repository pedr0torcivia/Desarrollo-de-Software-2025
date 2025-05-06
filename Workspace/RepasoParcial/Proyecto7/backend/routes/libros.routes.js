// routes/libros.routes.js

import express from "express";
import librosService from "../services/libros.service.js";

const router = express.Router();

// GET /api/libros → Lista todos los libros o filtra por título
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;

    if (search) {
      const librosFiltrados = await librosService.getAllByTitulo(search);
      res.json(librosFiltrados);
    } else {
      const libros = await librosService.getAll();
      res.json(libros);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/libros/:id → Elimina un libro por su IdLibro
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await librosService.remove(req.params.id);
    if (eliminado === 0) {
      res.status(404).json({ error: "Libro no encontrado" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
