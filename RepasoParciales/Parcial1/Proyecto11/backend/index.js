// index.js
import express from "express";
import cors from "cors";
import { sequelize, MovieModel } from "./databases/db.js";
import moviesRoutes from "./routes/movies.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/movies", moviesRoutes);

app.get("/", (req, res) => {
  res.send("API de Películas funcionando");
});

// 🧪 Seeding de películas si la tabla está vacía
async function seedMovies() {
  const count = await MovieModel.count();
  if (count === 0) {
    await MovieModel.bulkCreate([
      {
        TITLE: "The Shawshank Redemption",
        STATUS: "Released",
        RELEASE_DATE: "1994-09-23",
        LANGUAGE: "en",
        RUNTIME: 142,
        BUDGET: 25000000,
        POPULARITY: 85.3,
        VOTE_AVERAGE: 9.3,
        VOTE_COUNT: 2000000
      },
      {
        TITLE: "Parasite",
        STATUS: "Released",
        RELEASE_DATE: "2019-05-30",
        LANGUAGE: "ko",
        RUNTIME: 132,
        BUDGET: 11400000,
        POPULARITY: 90.1,
        VOTE_AVERAGE: 8.6,
        VOTE_COUNT: 700000
      },
      {
        TITLE: "Interstellar",
        STATUS: "Released",
        RELEASE_DATE: "2014-11-07",
        LANGUAGE: "en",
        RUNTIME: 169,
        BUDGET: 165000000,
        POPULARITY: 98.5,
        VOTE_AVERAGE: 8.7,
        VOTE_COUNT: 1800000
      },
      {
        TITLE: "La La Land",
        STATUS: "Released",
        RELEASE_DATE: "2016-12-09",
        LANGUAGE: "en",
        RUNTIME: 128,
        BUDGET: 30000000,
        POPULARITY: 75.2,
        VOTE_AVERAGE: 8.0,
        VOTE_COUNT: 600000
      },
      {
        TITLE: "El Secreto de Sus Ojos",
        STATUS: "Released",
        RELEASE_DATE: "2009-08-13",
        LANGUAGE: "es",
        RUNTIME: 129,
        BUDGET: 2000000,
        POPULARITY: 50.6,
        VOTE_AVERAGE: 8.2,
        VOTE_COUNT: 150000
      }
    ]);
    console.log("🎬 Se insertaron películas de ejemplo.");
  }
}

// Arranca el servidor
sequelize.sync().then(async () => {
  console.log("📂 Base de datos conectada.");
  await seedMovies();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Error al conectar base de datos:", err);
});
