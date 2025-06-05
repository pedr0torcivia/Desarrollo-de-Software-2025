// Importa el módulo express para crear rutas
import express from "express";

// Importa el servicio de reparaciones que contiene la lógica de acceso a la base
import reparacionesService from "../services/reparaciones.service.js";

// Crea una instancia del enrutador de Express
const router = express.Router();

// ========================
// GET /reparaciones
// Lista todas las reparaciones
// ========================
router.get("/", async (req, res) => {
  try {
    const reparaciones = await reparacionesService.getAll(); // Busca todas
    res.json(reparaciones);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error genérico
  }
});

// ========================
// GET /reparaciones/buscar/:cliente
// Lista reparaciones cuyo nombreCliente comience con :cliente
// ========================
router.get("/buscar/:cliente", async (req, res) => {
  try {
    const { cliente } = req.params; // Extrae el valor del path param
    const resultados = await reparacionesService.getAllByCliente(cliente);
    res.json(resultados);
  } catch (error) {
    res.status(400).json({ error: error.message }); // Error de validación o búsqueda
  }
});

// POST /reparaciones - Crear nueva reparación
router.post("/", async (req, res) => {
  try {
    const nueva = await reparacionesService.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /reparaciones/:id - Eliminar reparación por ID
router.delete("/:id", async (req, res) => {
  try {
    const eliminadas = await reparacionesService.remove(req.params.id);
    if (eliminadas === 0) {
      res.status(404).json({ error: "Reparación no encontrada" });
    } else {
      res.status(204).send(); // Sin contenido, pero exitosa
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Exporta el router para ser usado en app.js
export default router;
