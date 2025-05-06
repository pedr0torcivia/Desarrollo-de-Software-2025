// /backend/index.js

import express from "express";
import cors from "cors";
import { sequelize, TurnoModel } from "./databases/db.js";
import turnosRoutes from "./routes/turnos.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas para turnos
app.use("/turnos", turnosRoutes);

// Ruta raíz para probar funcionamiento
app.get("/", (req, res) => {
  res.send("API de Turnos funcionando");
});

// Inserta algunos turnos si la tabla está vacía
async function seedData() {
  const count = await TurnoModel.count();
  if (count === 0) {
    await TurnoModel.bulkCreate([
      {
        fechaTurno: new Date("2025-05-20"),
        nombrePaciente: "Ana Torres",
        especialidad: "Cardiología",
        medicoAsignado: "Dr. Gómez",
        estado: "Confirmado",
        observaciones: "Control anual",
      },
      {
        fechaTurno: new Date("2025-05-21"),
        nombrePaciente: "Carlos Ruiz",
        especialidad: "Pediatría",
        medicoAsignado: "Dra. Molina",
        estado: "Pendiente",
        observaciones: null,
      },
      {
        fechaTurno: new Date("2025-05-22"),
        nombrePaciente: "Luisa Díaz",
        especialidad: "Traumatología",
        medicoAsignado: "Dr. Pérez",
        estado: "Cancelado",
        observaciones: "Paciente canceló",
      }
    ]);
    console.log("🔧 Turnos de ejemplo insertados");
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
