import express from "express";
import { articulosfamilias } from "../base-orm/sequelize-init.js";

const router = express.Router();

router.get("/api/articulosfamilias", async (req, res) => {
  const data = await articulosfamilias.findAll({
    attributes: ["IdArticuloFamilia", "Nombre"],
  });
  res.json(data);
});

export default router;
