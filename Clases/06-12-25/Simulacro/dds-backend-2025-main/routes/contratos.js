const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Contrato = require("../models/contratosModel");

// GET /api/contratos?NombreContrato=...
router.get("/", async (req, res) => {
  try {
    const { NombreContrato } = req.query;

    let where = {};
    if (NombreContrato) {
      where.NombreContrato = {
        [Op.like]: `%${NombreContrato}%`
      };
    }

    const contratos = await Contrato.findAll({
      where,
      order: [["NombreContrato", "ASC"]]
    });

    res.json(contratos);
  } catch (error) {
    console.error("Error al obtener contratos:", error);
    res.status(500).json({ error: "Error al obtener contratos" });
  }
});

// POST /api/contratos
router.post("/", async (req, res) => {
  try {
    const contratoNuevo = await Contrato.create(req.body);
    res.status(201).json(contratoNuevo);
  } catch (error) {
    console.error("Error al crear contrato:", error);
    res.status(400).json({ error: "Error al crear contrato", detalle: error });
  }
});

module.exports = router;
