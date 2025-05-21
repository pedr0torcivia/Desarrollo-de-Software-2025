// Importar express
import express from "express";

// Crear la app
const app = express();

// Middleware para leer JSON en el body
app.use(express.json());

// Importar rutas mock (si las vas a usar luego)
import articulosFamiliasMockRouter from "./routes/articulosfamiliasmock.js";
app.use(articulosFamiliasMockRouter);

// Importar rutas reales (ORM) si están disponibles
// import articulosFamiliasRouter from "./routes/articulosfamilias.js";
// app.use(articulosFamiliasRouter);

// Cargar base de datos si no existe (opcional si tenés ORM)
// import "./base-orm/sqlite-init.js";

// Ruta básica de prueba
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

// Levantar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${port}`);
});
