// /backend/index.js

import express from "express";
import cors from "cors";
import { sequelize, LibroModel } from "./databases/db.js";
import librosRoutes from "./routes/libros.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(cors());
app.use(express.json());

// Prefijo API
app.use("/api/libros", librosRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("API de Libros funcionando");
});

// Inserta 40 libros de ejemplo si la tabla está vacía
async function seedData() {
  const count = await LibroModel.count();
  if (count === 0) {
    const libros = [];
    for (let i = 1; i <= 40; i++) {
      libros.push({
        Titulo: `Libro de prueba ${i}`,
        Autor: `Autor ${i}`,
        AnioPublicacion: 2000 + (i % 25),
      });
    }
    await LibroModel.bulkCreate(libros);
    console.log("✅ Se insertaron 40 libros de ejemplo.");
  }
}

// Arranca el servidor y sincroniza la DB
sequelize.sync({ force: false }).then(async () => {
  console.log("📚 Base de datos conectada.");
  await seedData();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Error al conectar la base de datos:", err);
});
