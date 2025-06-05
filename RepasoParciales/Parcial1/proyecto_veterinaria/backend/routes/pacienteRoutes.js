// Importamos Express para crear el router
const express = require('express');

// Creamos una instancia de router para definir rutas específicas
const router = express.Router();

// Importamos el modelo Paciente definido en Sequelize
const Paciente = require('../models/paciente');

// Importamos los operadores de Sequelize, necesarios para búsquedas avanzadas (como LIKE)
const { Op } = require("sequelize");


// Ruta GET principal: lista todos los pacientes, o filtra por nombre de propietario si se pasa como query string
router.get('/', async (req, res) => {
  try {
    let pacientes;
    
    // Si viene un query string 'propietario', se aplica un filtro con LIKE
    if (req.query.propietario) {
      pacientes = await Paciente.findAll({
        where: {
          Propietario: {
            [Op.like]: `%${req.query.propietario}%` // Búsqueda parcial (como un LIKE en SQL)
          }
        }
      });
    } else {
      // Si no hay filtro, trae todos los registros
      pacientes = await Paciente.findAll();
    }

    // Devuelve la lista de pacientes en formato JSON
    res.json(pacientes);
  } catch (error) {
    // Si algo sale mal, responde con error 500
    res.status(500).json({ error: error.message });
  }
});


// Ruta GET para obtener un único paciente por ID (usando el parámetro de ruta)
router.get('/:id', async (req, res) => {
  try {
    // Busca el paciente por su clave primaria (ID)
    const paciente = await Paciente.findByPk(req.params.id);
    
    // Si no existe el paciente, devuelve 404
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    // Si lo encuentra, lo devuelve en formato JSON
    res.json(paciente);
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: error.message });
  }
});


// Ruta POST para crear un nuevo paciente (alta)
// Recibe los datos en el cuerpo de la solicitud (JSON)
router.post('/', async (req, res) => {
  try {
    // Extrae los campos del cuerpo del request
    const { NombreMascota, Propietario, Telefono } = req.body;

    // Crea un nuevo paciente en la base de datos
    const newPaciente = await Paciente.create({ NombreMascota, Propietario, Telefono });

    // Devuelve el nuevo paciente creado con código 201 (creado)
    res.status(201).json(newPaciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Ruta PUT para actualizar un paciente existente por ID
router.put('/:id', async (req, res) => {
  try {
    const { NombreMascota, Propietario, Telefono } = req.body;

    // Busca el paciente por ID
    const paciente = await Paciente.findByPk(req.params.id);

    // Si no existe, devuelve 404
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    // Actualiza los campos
    paciente.NombreMascota = NombreMascota;
    paciente.Propietario = Propietario;
    paciente.Telefono = Telefono;

    // Guarda los cambios en la base de datos
    await paciente.save();

    // Devuelve el paciente actualizado
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Ruta DELETE para eliminar un paciente por ID
router.delete('/:id', async (req, res) => {
  try {
    // Busca el paciente por su ID
    const paciente = await Paciente.findByPk(req.params.id);

    // Si no existe, devuelve 404
    if (!paciente) {
      return res.status(404).json({ message: "Paciente no encontrado" });
    }

    // Elimina el paciente de la base de datos
    await paciente.destroy();

    // Confirma la eliminación
    res.json({ message: "Paciente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Exportamos el router para que pueda ser utilizado en el archivo principal del backend
module.exports = router; 