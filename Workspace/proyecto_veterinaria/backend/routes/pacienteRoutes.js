// backend/routes/pacienteRoutes.js
const express = require('express');
const router = express.Router();
const Paciente = require('../models/Paciente');
// Necesario para usar operadores de comparación en Sequelize
const { Op } = require("sequelize");

// Ruta para listar pacientes, con opción a filtrar por propietario
router.get('/', async (req, res) => {
  try {
    let pacientes;
    if (req.query.propietario) {
      pacientes = await Paciente.findAll({
        where: {
          Propietario: {
            [Op.like]: `%${req.query.propietario}%`
          }
        }
      });
    } else {
      pacientes = await Paciente.findAll();
    }
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un paciente específico por ID
router.get('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo paciente (Bonus)
router.post('/', async (req, res) => {
  try {
    const { NombreMascota, Propietario, Telefono } = req.body;
    const newPaciente = await Paciente.create({ NombreMascota, Propietario, Telefono });
    res.status(201).json(newPaciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un paciente por ID
router.put('/:id', async (req, res) => {
  try {
    const { NombreMascota, Propietario, Telefono } = req.body;
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    paciente.NombreMascota = NombreMascota;
    paciente.Propietario = Propietario;
    paciente.Telefono = Telefono;
    await paciente.save();
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un paciente por ID
router.delete('/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }
    await paciente.destroy();
    res.json({ message: "Paciente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
