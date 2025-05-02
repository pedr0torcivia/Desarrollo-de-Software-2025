// 1) Construir aplicacion express
import express from "express";
import cors from "cors"; 

// 25) Importar router 
import usuariosRouter from "./routes/usuarios.routes.js";
import tareasRouter from "./routes/tareas.routes.js";

const app = express(); // Inicializar express
app.use(express.json());  // Permite leer el req.body de las peticiones

app.use(cors({ origin: "*" })); // * para permitir solicitudes de cualquier origen desde el frontend
// Declaro politicas de cors para permitir solicitudes desde el frontend

// 26)- definir entrada a endpoints de los usuarios

app.use("/usuarios", usuariosRouter);
app.use("/tareas", tareasRouter);

export default app; // 4) Exportar la aplicacion express para usarla en otros archivos