import express from 'express';
import cors from 'cors';
import sequelize from './database/sequelize.js';
import service from './services/reservas.service.js';

// Servidor Express
const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.get("/reservas", async (req, res) => {
  try {
    const reservas = await service.getAll();
    res.json(reservas);
  } catch (error) {
    console.error("❌ ERROR EN GET /reservas:", error);
    res.status(500).json({ error: "Error al obtener reservas" });
  }
});

app.post("/reservas", async (req, res) => {
  try {
    const nueva = await service.create(req.body);
    res.json(nueva);
  } catch (error) {
    console.error("❌ ERROR EN POST /reservas:", error);
    res.status(500).json({ error: "Error al crear reserva" });
  }
});

// Inicializar la base de datos y cargar datos de ejemplo
sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("🚀 Servidor backend activo en http://localhost:3001");
  });
}).catch(err => {
  console.error("❌ Error al iniciar Sequelize:", err);
});