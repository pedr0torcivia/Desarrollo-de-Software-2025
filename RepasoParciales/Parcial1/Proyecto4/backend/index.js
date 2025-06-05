// /backend/index.js

// Importa las dependencias necesarias
import express from "express"; // Framework para construir la API
import cors from "cors"; // Middleware para permitir solicitudes desde otros orígenes (CORS)
import { sequelize, PacienteModel } from "./databases/db.js"; // Importa la conexión Sequelize y el modelo de Empresa
import pacientesRoutes from "./routes/pacientes.routes.js"; // Importa las rutas de empresas

// Inicializa la aplicación de Express y configura el puerto
const app = express();
const PORT = process.env.PORT || 3000; // Usa el puerto del entorno o el 3000 por defecto

// Middleware global
app.use(cors()); // Habilita CORS para permitir peticiones desde el navegador
app.use(express.json()); // Permite recibir datos en formato JSON en las peticiones
app.use("/api/pacientes", pacientesRoutes); // Asocia las rutas de empresas bajo el prefijo /api/empresas

// Función para insertar datos iniciales si la tabla está vacía
async function seedData() {
  const count = await PacienteModel.count(); // Cuenta cuántas empresas existen
  if (count === 0) { // Si no hay ninguna, inserta algunos datos de ejemplo
    await PacienteModel.bulkCreate([
      {
        propietario: "Goku",
        nombreMascota: "Rosita",
        telefono: "21312321321",
      },
      {
        propietario: "Naruto",
        nombreMascota: "Sasuke",
        telefono: "235235325",
      },
      {
        propietario: "Peche",
        nombreMascota: "Puchito",
        telefono: "6456654634",
      }
    ]);
    console.log("Datos de Pacientes insertados."); // Mensaje de éxito en consola
  }
}

// Sincroniza el modelo con la base de datos y arranca el servidor
sequelize.sync().then(async () => {
  console.log("Base de datos conectada.");
  await seedData(); // Ejecuta inserción de datos si es necesario

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`); // Informa la URL del servidor
  });
}).catch((err) => {
  console.error("❌ Error al conectar base de datos:", err); // En caso de error en conexión
});