import express from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';

const router = express.Router();
const claveSecreta = 'claveSecreta';

// POST /api/login
router.post('/login', async (req, res) => {
  const { usuario, clave } = req.body;

  // Buscar usuario por nombre y clave
  const user = await Usuario.findOne({ where: { usuario, clave } });

  if (!user) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' });
  }

  // Generar token
  const token = jwt.sign({ usuario: user.usuario }, claveSecreta, { expiresIn: '1h' });
  res.json({ token });
});

// Middleware de verificación de token
function verificarToken(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(403).json({ mensaje: 'Falta token' });

  const token = header.split(' ')[1];
  jwt.verify(token, claveSecreta, (err, decoded) => {
    if (err) return res.status(403).json({ mensaje: 'Token inválido' });
    req.user = decoded;
    next();
  });
}

// GET /api/jwt/articulos - Recurso protegido
router.get('/jwt/articulos', verificarToken, (req, res) => {
  res.json([
    { id: 1, nombre: "Café", precio: 1200 },
    { id: 2, nombre: "Muffin", precio: 800 }
  ]);
});

export default router;
