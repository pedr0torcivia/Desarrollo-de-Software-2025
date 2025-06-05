// /backend/index.js

import express from "express";
import cors from "cors";
import { sequelize, PeliculaModel } from "./databases/db.js";
import peliculasRoutes from "./routes/peliculas.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas para peliculas
app.use("/peliculas", peliculasRoutes);

// Ruta raíz para probar funcionamiento
app.get("/", (req, res) => {
  res.send("API de peliculas funcionando");
});

// Inserta algunos peliculas si la tabla está vacía
async function seedData() {
  const count = await PeliculaModel.count();
  if (count === 0) {
    await PeliculaModel.bulkCreate([
      {
        titulo: "Iron Man",
        director: "Jon Favreau",
        anioEstreno: 2008,
        genero: "Acción",
        puntajeIMDB: 7.9
      },
      {
        titulo: "The Avengers",
        director: "Joss Whedon",
        anioEstreno: 2012,
        genero: "Acción",
        puntajeIMDB: 8.0
      },
      {
        titulo: "Black Panther",
        director: "Ryan Coogler",
        anioEstreno: 2018,
        genero: "Aventura",
        puntajeIMDB: 7.3
      },
      {
        titulo: "Spider-Man: No Way Home",
        director: "Jon Watts",
        anioEstreno: 2021,
        genero: "Acción",
        puntajeIMDB: 8.2
      },
      {
        titulo: "Doctor Strange",
        director: "Scott Derrickson",
        anioEstreno: 2016,
        genero: "Fantasía",
        puntajeIMDB: 7.5
      }
    ]);
    console.log("🔧 Peliculas de ejemplo insertados");
  }
}

// Arranca el servidor
sequelize.sync().then(async () => {
  console.log("📂 Base de datos conectada.");
  await seedData();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Error al conectar base de datos:", err);
});
