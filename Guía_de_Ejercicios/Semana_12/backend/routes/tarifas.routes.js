// routers/tarifas.routes.js

import express from "express";
import TarifaService from "../services/tarifaService.js";

const router = express.Router();

// Obtener todas las tarifas (paginado)
router.get("/", async (req, res) => {
  try {
    const pagina = parseInt(req.query.pagina, 10) || 1;
    const limite = parseInt(req.query.limite, 10) || 10;
    console.log(TarifaService);
    const tarifas = await TarifaService.listar({ pagina, limite });
    return res.status(200).json(tarifas);
  }
  catch (error) {
    console.error("Error recuperando tarifas:", error);
    const status = error.status || 500;
    return res.status(status).json({ error: error.message || "Error interno del servidor" });
  }
});

// Obtener tarifa por clave primaria
router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ error: "Parámetro incorrecto..." });
    }
    const tarifa = await TarifaService.obtenerPorId(id);
    return res.status(200).json(tarifa);
  }
  catch (error) {
    console.error("Error recuperando tarifa:", error);
    const status = error.status || 500;
    return res.status(status).json({ error: error.message || "Error interno del servidor" });
  }
});

// Obtener tarifas por día de la semana
router.get("/semana/:diaSemana", async (req, res) => {
  try {
    const diaSemana = parseInt(req.params.diaSemana, 10);
    const tipoTarifa = parseInt(req.query.tipoTarifa || "-1", 10);
    const tarifas = await TarifaService.buscarPorSemana(diaSemana, tipoTarifa);
    return res.status(200).json(tarifas);
  }
  catch (error) {
    console.error("Error recuperando tarifas por semana:", error);
    const status = error.status || 500;
    return res.status(status).json({ error: error.message || "Error interno del servidor" });
  }
});

// Obtener tarifas por fecha específica
router.get("/fecha", async (req, res) => {
  try {
    const dia = parseInt(req.query.dia, 10);
    const mes = parseInt(req.query.mes, 10);
    const anio = parseInt(req.query.anio, 10);
    const tipoTarifa = parseInt(req.query.tipoTarifa || "-1", 10);
    const tarifas = await TarifaService.buscarPorFecha(dia, mes, anio, tipoTarifa);
    return res.status(200).json(tarifas);
  }
  catch (error) {
    console.error("Error recuperando tarifas por fecha:", error);
    const status = error.status || 500;
    return res.status(status).json({ error: error.message || "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const nueva = await TarifaService.crear(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
  try {
    const actualizada = await TarifaService.actualizar(id, req.body);
    res.status(200).json(actualizada);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });
  try {
    await TarifaService.eliminar(id);
    res.status(204).send();
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
});

export default router;
