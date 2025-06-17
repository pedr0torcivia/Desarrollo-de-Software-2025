// routes/public/auth.routes.js

import express from "express";
import cuentaService from "../services/cuentaService.js";

const router = express.Router();

// 🎯 POST /auth/login
// eslint-disable-next-line consistent-return
router.post("/login", async (req, res) => {
  const { mail, password } = req.body;

  const resultado = await cuentaService.login(mail, password);

  if (!resultado) {
    return res.status(401).json({ error: "Usuario o contraseña inválidos" });
  }

  res.json(resultado);
});

// 🆕 POST /auth/register
router.post("/register", async (req, res) => {
  const { nombre, apellido, mail, direccion, idBarrio, password } = req.body;

  try {
    const nuevaCuenta = await cuentaService.crearCuxenta(
      { nombre, apellido, mail, direccion, idBarrio },
      password
    );
    res.status(201).json(nuevaCuenta);
  }
  catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
