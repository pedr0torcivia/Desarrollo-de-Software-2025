// 22) Importar express y el servicio de usuarios
import express from "express";
import userServices from "../services/usuarios.service.js";

// 23) Declarar router
const router = express.Router();

// Definir endpoints 
router.get("/verUsuarios", async(req, res) => {
    try {
        const usuarios = await userServices.getAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
} )

router.get("/obtenerById/:id", async(req, res) => {
    try {
        const usuario = await userServices.getById(req.params.id);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
} )

router.get("/Buscar", async (req, res) => {
    try {
        const filtros = req.query;
        const usuarios = await userServices.getByFilter(filtros);
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/crearUsuarios", async(req,res) => {
    try {
        console.log(req.body);
        const usuario = await userServices.createUser(req.body);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
} )

router.delete("/eliminarUsuario/:id", async(req, res) => {
    const {id} = req.params;
    try {
        const usuarioEliminado = await userServices.deleteUser(id);
        res.status(200).json({exito:"Usuario eliminado"})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

router.put("/actualizarUsuario", async(req, res) => {
    const {id} = req.query;
    try {
        const response = await userServices.updateUser(id, req.body);
        res.status(200).json({exito:"Usuario Actualizado"})
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}) 

router.get("/filtros", async (req, res) => {
    const {apellido} = req.query;
    try {
        const response = await userServices.getByApellido(apellido);
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({error: error.message});
    }
})

export default router;
