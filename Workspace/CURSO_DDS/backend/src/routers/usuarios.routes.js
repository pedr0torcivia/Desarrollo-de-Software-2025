import express from "express"
import { usersServices } from "../services/usuarios.service.js"
// En este router se definen los EndPoints
// "Cuando llegue una petición a /usuarios/obtenerTodos, ¿qué función del servicio debería ejecutar?"
// Cuando el cliente hace una peticion es una req y cuando el servidor le devuelve algo al cliente sellama response
// ------------------------------------------------------------------------------------------------------------------


// Definicion de Endpoint para "Mostrar Todos los Usuarios"
const router = express.Router() 
router.get("/obtenerTodos", async(req, res) => {
    try {
        const usuarios = await usersServices.getAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({error: "Oops, algo salio mal"});;
    }
});


// Definicion de Endpoint para "Buscar por ID" (PATH PARAM)
router.get("/obtenerById/:id", async (req, res) => {
    try {
        const usuario = await usersServices.getById(req.params.id);
        res.json(usuario);
    } catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        res.status(500).json({ error: "Algo falla" });
    }
});


// Definicion de Endpoint para "Crear Usuario"
router.post("/crearUsuario", async (req, res) => {
    try {
        const usuario = await usersServices.createUser(req.body)
        res.json(usuario);

    } catch (error) {
        res.status(500).json({ error: "Algo falla" });
    }
})

// Definicion de Endpoint para "Eliminar Usuario (QUERY PARAM)"
router.delete("/usuarioABorrar", async (req, res) => {
    const { id } = req.query;
    try {
        const resultado = await usersServices.deleteUser(id);

        if (resultado === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.status(200).json({ exito: "El usuario se borró correctamente" });
    } catch (error) {
        console.error("Error al eliminar:", error);
        res.status(500).json({ error: "Algo falla" });
    }
});



// Definicion de Endpoint para "Modificar Usuario"
router.put("/modificar", async (req, res) => {
    const { id } = req.query;

    try {
        const response = await usersServices.updateUser(id, req.body);

        if (!response) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.json(response)
    } catch (error) {
        res.status(500).json({ error: "Algo falla" });
    }
})


// Get by filter de usuario (filtro que sea por apellido)
router.get("/byFilters", async (req, res) => {
    try {
        const response = await usersServices.getByFilters(req.query.nombre, req.query.apellido);

        if (response.length === 0) {
            return res.status(200).json({ mensaje: "No se encontraron usuarios" });
        }

        return res.json(response);
    } catch (error) {
        return res.status(500).json({ error: "Algo salió mal en el servidor" });
    }
});



// Consulta compleja de sequelize 
router.get("/ejercicio", async (req, res) => {
    try {
        const response = await usersServices.ejercicio(req.query.apellido);

        if (Array.isArray(response) && response.length === 0) {
            return res.status(200).json({ mensaje: "No se encontraron usuarios" });
        }
        res.json(response);
        
    } catch (error) {
        console.error("Error en /ejercicio:", error);
        res.status(500).json({ error: "Algo salió mal" });
    }
});



const usuarioRouter  = {
    router
}

export { usuarioRouter }