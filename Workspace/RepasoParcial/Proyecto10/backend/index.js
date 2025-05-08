import express from "express";
import cors from "cors";
import { sequelize, ParcialModel } from "./databases/db.js";
import parcialesRoutes from "./routes/parciales.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas para zapatillas
app.use("/parciales", parcialesRoutes);

// Ruta raíz para probar funcionamiento
app.get("/", (req, res) => {
  res.send("API de Parciales funcionando");
});

// Inserta algunas zapatillas si la tabla está vacía
async function seedData() {
  const count = await ParcialModel.count();
  if (count === 0) {
    await ParcialModel.bulkCreate([
      {
        legajoAlumno: 1001,
        nombreAlumno: "Lucía",
        apellidoAlumno: "Gómez",
        materia: "Matemática",
        nota: 8.5
      },
      {
        legajoAlumno: 1002,
        nombreAlumno: "Julián",
        apellidoAlumno: "Martínez",
        materia: "Programación",
        nota: 9.0
      },
      {
        legajoAlumno: 1003,
        nombreAlumno: "Sofía",
        apellidoAlumno: "Pérez",
        materia: "Redes",
        nota: 6.5
      },
      {
        legajoAlumno: 1004,
        nombreAlumno: "Martín",
        apellidoAlumno: "López",
        materia: "Arquitectura de Computadoras",
        nota: 7.0
      },
      {
        legajoAlumno: 1005,
        nombreAlumno: "Camila",
        apellidoAlumno: "Fernández",
        materia: "Bases de Datos",
        nota: 10.0
      },
      {
        legajoAlumno: 1006,
        nombreAlumno: "Agustín",
        apellidoAlumno: "Ramírez",
        materia: "Sistemas Operativos",
        nota: null
      }
    ]);
    console.log("📚 Parciales de ejemplo insertados");
  }};

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
