// index.js
import express from "express";
import cors from "cors";
import { sequelize, AlbumModel } from "./databases/db.js";
import albumesRoutes from "./routes/albumes.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/albumes", albumesRoutes);

async function seedData() {
  const count = await AlbumModel.count();
  if (count === 0) {
    await AlbumModel.bulkCreate([
      {
        artista: "Pink Floyd",
        album: "The Dark Side of the Moon",
        genero: "Rock progresivo",
        soporte: "Vinilo",
        precio: 12000,
      },
      {
        artista: "Daft Punk",
        album: "Random Access Memories",
        genero: "Electrónica",
        soporte: "CD",
        precio: 9500,
      },
      {
        artista: "Eminem",
        album: "The Eminem Show",
        genero: "Hip-Hop",
        soporte: "Vynil",
        precio: 8000,
      },
    ]);
    console.log("📀 Datos de álbumes insertados.");
  }
}

sequelize.sync().then(async () => {
  console.log("Base de datos conectada.");
  await seedData();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Error al conectar base de datos:", err);
});
