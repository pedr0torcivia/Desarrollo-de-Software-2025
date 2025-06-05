// backend/routesempresas.routes.js

// Importa el módulo express para crear rutas
import express from "express";

// Importa el modelo de Empresa desde la base de datos
import { EmpresaModel } from "../databases/db.js";

// Importa el operador "Op" de Sequelize, usado para operaciones como LIKE, AND, OR, etc.
import { Op } from "sequelize";

// Crea una instancia del enrutador de Express
const router = express.Router();

// ========================
// GET /api/empresas
// Lista todas las empresas o filtra por nombre y/o razón social si se pasan por query
// ========================
router.get("/", async (req, res) => {
  const { nombre, razonSocial } = req.query; // Extrae los filtros desde la URL

  try {
    const where = {}; // Objeto de filtros

    // Si se pasa ?nombre= algo, agrega el filtro con operador LIKE
    if (nombre) {
      where.nombre = { [Op.like]: `%${nombre}%` };
    }

    // Si se pasa ?razonSocial= algo, agrega el filtro con operador LIKE
    if (razonSocial) {
      where.razonSocial = { [Op.like]: `%${razonSocial}%` };
    }

    // Busca todas las empresas que cumplan con los filtros
    const empresas = await EmpresaModel.findAll({
      where,
      attributes: ["id", "nombre", "razonSocial", "tipoEmpresa", "cantidadEmpleados"], // Solo devuelve estos campos
    });

    res.json(empresas); // Responde con el array de empresas encontradas
  } catch (error) {
    res.status(500).json({ error: error.message }); // Si hay error, responde con código 500
  }
});

// ========================
// POST /api/empresas
// Crea una nueva empresa
// ========================
router.post("/", async (req, res) => {
  try {
    const nuevaEmpresa = await EmpresaModel.create(req.body); // Crea una nueva empresa con los datos enviados
    res.status(201).json(nuevaEmpresa); // Devuelve la empresa creada con status 201 (Created)
  } catch (error) {
    res.status(400).json({ error: error.message }); // Si hay error de validación, responde con 400
  }
});

// ========================
// PUT /api/empresas/:id
// Actualiza una empresa por ID
// ========================
router.put("/:id", async (req, res) => {
  try {
    // Intenta actualizar la empresa con los datos del body donde el ID coincida
    const [updated] = await EmpresaModel.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      // Si se actualizó, se busca la empresa actualizada y se devuelve
      const actualizado = await EmpresaModel.findByPk(req.params.id);
      res.json(actualizado);
    } else {
      // Si no se actualizó nada, significa que no se encontró la empresa
      res.status(404).json({ error: "Empresa no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message }); // Error en la actualización
  }
});

// ========================
// GET /api/empresas/:id
// Obtiene una empresa por su ID
// ========================
router.get("/:id", async (req, res) => {
  try {
    // Busca la empresa por ID y devuelve solo campos específicos
    const empresa = await EmpresaModel.findByPk(req.params.id, {
      attributes: ["id", "nombre", "razonSocial", "tipoEmpresa", "cantidadEmpleados"]
    });

    if (!empresa) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }

    res.json(empresa); // Devuelve la empresa encontrada
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error al buscar por ID
  }
});

// ========================
// DELETE /api/empresas/:id
// Elimina una empresa por su ID
// ========================
router.delete("/:id", async (req, res) => {
  try {
    // Intenta eliminar la empresa por ID
    const deleted = await EmpresaModel.destroy({ where: { id: req.params.id } });

    if (deleted) {
      res.status(204).send(); // 204 = No Content (éxito pero sin cuerpo)
    } else {
      res.status(404).json({ error: "Empresa no encontrada" }); // No se encontró la empresa
    }
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error en la eliminación
  }
});

// Exporta el router para usarlo en app.js u otro archivo principal
export default router;
