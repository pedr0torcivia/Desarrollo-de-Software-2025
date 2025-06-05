import express from "express";
import cors from "cors";
import { sequelize, ProductoModel } from "./databases/db.js";
import productosRoutes from "./routes/productos.routes.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Rutas
app.use("/productos", productosRoutes);

// Función para insertar productos de ejemplo si la tabla está vacía
async function seedData() {
  const count = await ProductoModel.count();
  if (count === 0) {
    await ProductoModel.bulkCreate([
      {
        nombre: "Aceite",
        tipo: 1,
        precio: 5699,
        aReponer: "N",
        marca: "YPF",
      },
      {
        nombre: "Filtro de aire John Deere",
        tipo: 2,
        precio: 7500,
        aReponer: "S",
        marca: "Bosch",
      },
      {
        nombre: "Insumo para sembradora",
        tipo: 3,
        precio: 13500,
        aReponer: "N",
        marca: "Pla",
      },
      {
        nombre: "Llave combinada 13mm",
        tipo: 4,
        precio: 2999,
        aReponer: "N",
        marca: "Tramontina",
      },
    ]);
    console.log("🔧 Productos de ejemplo insertados");
  }
}

// Ruta raíz de prueba
app.get("/", (req, res) => {
  res.send("API de productos agro funcionando.");
});

// Sincroniza modelos y levanta servidor
sequelize.sync({ force: true }).then(async () => {
  console.log("📂 Base de datos sincronizada.");
  await seedData();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
  });
});
