import { Router } from "express";
import AlquilesService from "../services/alquileres.service.js";

const router = Router();

router.post('/', async (req, res) => {
    const alquiler = req.body;
    const alquilerCreado = await AlquilesService.crearAlquiler(alquiler, req.idCuenta);
    if (!alquilerCreado) {
        return res.status(400).json({ error: "Error al crear el alquiler" });
    }
    res.status(201).json(alquilerCreado);
})

export default router;