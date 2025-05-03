import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { usuarioRouter } from "./routers/usuarios.routes.js";

// Esto permite usar __dirname en ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewar
app.use(cors({ origin: "*" }));
app.use(express.json());

// Servir frontend que está fuera de backend/
app.use(express.static(path.join(__dirname, "../../frontend")));

// Endpoints de la API
app.use("/usuarios", usuarioRouter.router);

// Si acceden a localhost:4001/ que devuelva index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

export default app;

