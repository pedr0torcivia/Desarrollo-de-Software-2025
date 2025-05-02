// routes/empresas.routes.js
import express from "express";
import { EmpresaModel } from "../databases/db.js";
import { Op } from "sequelize";

const router = express.Router();

// GET /api/empresas (opcionalmente filtrar por nombre o razonSocial)
router.get("/", async (req, res) => {
  const { nombre, razonSocial } = req.query;

  try {
    const where = {};

    if (nombre) {
      where.nombre = { [Op.like]: `%${nombre}%` };
    }

    if (razonSocial) {
      where.razonSocial = { [Op.like]: `%${razonSocial}%` };
    }

    const empresas = await EmpresaModel.findAll({
      where,
      attributes: ["id", "nombre", "razonSocial", "tipoEmpresa", "cantidadEmpleados"],
    });

    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/empresas
router.post("/", async (req, res) => {
  try {
    const nuevaEmpresa = await EmpresaModel.create(req.body);
    res.status(201).json(nuevaEmpresa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/empresas/:id
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await EmpresaModel.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const actualizado = await EmpresaModel.findByPk(req.params.id);
      res.json(actualizado);
    } else {
      res.status(404).json({ error: "Empresa no encontrada" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/empresas/:id
router.get("/:id", async (req, res) => {
  try {
    const empresa = await EmpresaModel.findByPk(req.params.id, {
      attributes: ["id", "nombre", "razonSocial", "tipoEmpresa", "cantidadEmpleados"]
    });

    if (!empresa) {
      return res.status(404).json({ error: "Empresa no encontrada" });
    }

    res.json(empresa);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/empresas/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await EmpresaModel.destroy({ where: { id: req.params.id } });

    if (deleted) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ error: "Empresa no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
