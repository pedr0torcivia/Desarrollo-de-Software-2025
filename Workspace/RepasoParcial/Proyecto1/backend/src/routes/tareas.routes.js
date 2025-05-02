// routes/tareas.routes.js
import express from "express";
import tareasServices from "../services/tareas.services.js";

const router = express.Router();

// Obtener todas las tareas
router.get("/verTareas", async (req, res) => {
    try {
        const tareas = await tareasServices.getAll();
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Obtener tarea por ID
router.get("/obtenerById/:id", async (req, res) => {
    try {
        const tarea = await tareasServices.getById(req.params.id);
        res.json(tarea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buscar tareas por filtros (query params)
router.get("/buscar", async (req, res) => {
    try {
        const filtros = req.query;
        const tareas = await tareasServices.getByFilter(filtros);
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Crear nueva tarea
router.post("/crearTarea", async (req, res) => {
    try {
        const tarea = await tareasServices.createTarea(req.body);
        res.json(tarea);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar tarea por ID
router.delete("/eliminarTarea/:id", async (req, res) => {
    const { id } = req.params;
    try {
        await tareasServices.deleteTarea(id);
        res.status(200).json({ exito: "Tarea eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/actualizarTarea", async(req, res) => {
    const {id} = req.query;
    try {
        const response = await userServices.updateUser(id, req.body);
        res.status(200).json({exito:"Usuario Actualizado"})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}) 


export default router;
