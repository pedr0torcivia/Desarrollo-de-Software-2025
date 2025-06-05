// /backend/index.js

// Importa las dependencias necesarias
import express from "express"; // Framework para construir la API
import cors from "cors"; // Middleware para permitir solicitudes desde otros orígenes (CORS)
import { sequelize, EmpresaModel, ReparacionModel } from "./databases/db.js"; // Incluye también ReparacionModel
import reparacionesRoutes from "./routes/reparaciones.routes.js"; // Importa las rutas de reparaciones

// Inicializa la aplicación de Express y configura el puerto
const app = express(); 
const PORT = process.env.PORT || 3000; // Usa el puerto del entorno o el 3000 por defecto

// Middleware global
app.use(cors()); // Habilita CORS para permitir peticiones desde el navegador
app.use(express.json()); // Permite recibir datos en formato JSON en las peticiones
app.use("/api/reparaciones", reparacionesRoutes); // Asocia las rutas de reparaciones bajo el prefijo /api/reparaciones

// Ruta raíz para que responda en http://localhost:3000
app.get("/", (req, res) => {
  res.send("API de Reparaciones funcionando");
});


// Función para insertar datos iniciales si la tabla está vacía
async function seedData() {
  const count = await ReparacionModel.count(); // Cuenta cuántas reparaciones existen
  if (count === 0) { // Si no hay ninguna, inserta algunos datos de ejemplo
    await ReparacionModel.bulkCreate([
      {
        fechaRecepcion: new Date("2024-05-01"),
        nombreCliente: "Juan Pérez",
        tipoEquipo: "Laptop",
        descripcionProblema: "No enciende",
        estado: "Recibido",
        costoEstimado: 15000,
        pagado: false,
      },
      {
        fechaRecepcion: new Date("2024-05-02"),
        nombreCliente: "María García",
        tipoEquipo: "Impresora",
        descripcionProblema: "Atasco de papel",
        estado: "En Diagnóstico",
        costoEstimado: 8000,
        pagado: false,
      },
      {
        fechaRecepcion: new Date("2024-05-03"),
        nombreCliente: "Carlos López",
        tipoEquipo: "Monitor",
        descripcionProblema: "Pantalla parpadea",
        estado: "Esperando Repuesto",
        costoEstimado: 12000,
        pagado: true,
      }
    ]);
    console.log("Datos de Reparaciones insertados.");
  }
}

// Sincroniza el modelo con la base de datos y arranca el servidor
sequelize.sync().then(async () => {
  console.log("Base de datos conectada.");
  await seedData(); // Ejecuta inserción de datos si es necesario

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Error al conectar base de datos:", err);
});
