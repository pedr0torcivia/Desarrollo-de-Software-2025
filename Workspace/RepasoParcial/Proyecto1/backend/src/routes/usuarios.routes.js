// 22) Importar express y el servicio de usuarios
import express from "express";
import {userServices} from "../services/usuarios.service.js";

// 23) Declarar router
const router = express.Router();

// Definir endpoints 
router.get("/", async(req, res) => {
    try {
        const usuarios = await userServices.getAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
} )

router.post("/", async(req,res) => {
    
})

export default router;
