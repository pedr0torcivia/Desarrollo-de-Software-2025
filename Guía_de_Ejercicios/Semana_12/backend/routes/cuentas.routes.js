// routes/cuentas.routes.js

import express from "express";
import cuentaService from "../services/cuentaService.js";

const router = express.Router();

// GET /api/cuentas - obtener cuentas con admin = 1
router.get("/", async (req, res) => {
  const cuentas = await cuentaService.obtenerTodosLosAdmins();
  res.json(cuentas);
});

// GET /api/cuentas/:mail - obtener cuenta por mail
router.get("/:mail", async (req, res) => {
  const cuenta = await cuentaService.obtenerCuentaSeguraPorMail(req.params.mail);
  if (!cuenta) return res.status(404).json({ error: "Cuenta no encontrada" });
  res.json(cuenta);
});

// POST /api/cuentas - crear nueva cuenta
router.post("/", async (req, res) => {
  const { nombre, apellido, mail, direccion, idBarrio, password } = req.body;
  const cuenta = await cuentaService.crearCuenta({ nombre, apellido, mail, direccion, idBarrio }, password);
  res.status(201).json(cuenta);
});

// DELETE /api/cuentas/:mail - eliminar cuenta
router.delete("/:mail", async (req, res) => {
  const eliminado = await cuentaService.eliminarCuentaPorMail(req.params.mail);
  if (!eliminado) return res.status(404).json({ error: "Cuenta no encontrada" });
  res.status(204).end();
});

export default router;
