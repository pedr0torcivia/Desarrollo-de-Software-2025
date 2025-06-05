import express from "express";
import cors from "cors";
import { sequelize, ZapatillaModel } from "./databases/db.js";
import zapatillasRoutes from "./routes/zapatillas.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas para zapatillas
app.use("/zapatillas", zapatillasRoutes);

// Ruta raíz para probar funcionamiento
app.get("/", (req, res) => {
  res.send("API de zapatillas funcionando");
});

// Inserta algunas zapatillas si la tabla está vacía
async function seedData() {
  const count = await ZapatillaModel.count();
  if (count === 0) {
    await ZapatillaModel.bulkCreate([
      {
        marca: "Nike",
        modelo: "Air Max 90",
        talle: 9,
        precio: 54999.99,
        stock: 15
      },
      {
        marca: "Adidas",
        modelo: "Ultraboost 22",
        talle: 9.5,
        precio: 59999.99,
        stock: 10
      },
      {
        marca: "Puma",
        modelo: "RS-X",
        talle: 9,
        precio: 49999.00,
        stock: 5
      },
      {
        marca: "New Balance",
        modelo: "574",
        talle: 9,
        precio: 47999.50,
        stock: 12
      },
      {
        marca: "Converse",
        modelo: "Chuck Taylor",
        talle: 8.5,
        precio: 37999.00,
        stock: 8
      },
      {
        marca: "Nike",
        modelo: "Air Jordan 1 Retro High OG 'Chicago'",
        talle: 10.5,
        precio: 71999.99,
        stock: 7
      }
    ]);
    console.log("👟 Zapatillas de ejemplo insertadas");
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
