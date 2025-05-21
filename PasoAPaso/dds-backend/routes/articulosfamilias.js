const express = require("express");
const router = express.Router();

const db = require("../base-orm/sequelize-init");

// GET todos los artículos familia
router.get("/api/articulosfamilias", async function (req, res, next) {
  let data = await db.articulosfamilias.findAll({
    attributes: ["IdArticuloFamilia", "Nombre"],
  });
  res.json(data);
});

// GET por ID (Ejercicio)
router.get("/api/articulosfamilias/:id", async function (req, res) {
  let item = await db.articulosfamilias.findByPk(req.params.id, {
    attributes: ["IdArticuloFamilia", "Nombre"],
  });

  if (item) res.json(item);
  else res.status(404).json({ message: "articulofamilia no encontrado" });
});

module.exports = router;
