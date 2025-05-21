import express from "express";
const router = express.Router();

const arrayArticuloFamilia = [
  { IdArticuloFamilia: 1, Nombre: "Accesorios" },
  { IdArticuloFamilia: 2, Nombre: "Audio" },
  { IdArticuloFamilia: 3, Nombre: "Celulares" },
];

router.get("/api/articulosfamiliasmock", (req, res) => {
  res.json(arrayArticuloFamilia);
});

export default router;
