// /backend/index.js

// Importa las dependencias necesarias
import express from "express"; // Framework para construir la API
import cors from "cors"; // Middleware para permitir solicitudes desde otros orígenes (CORS)
import { sequelize, EmpresaModel } from "./databases/db.js"; // Importa la conexión Sequelize y el modelo de Empresa
import empresasRoutes from "./routes/empresas.routes.js"; // Importa las rutas de empresas

// Inicializa la aplicación de Express y configura el puerto
const app = express();
const PORT = process.env.PORT || 3000; // Usa el puerto del entorno o el 3000 por defecto

// Middleware global
app.use(cors()); // Habilita CORS para permitir peticiones desde el navegador
app.use(express.json()); // Permite recibir datos en formato JSON en las peticiones
app.use("/api/empresas", empresasRoutes); // Asocia las rutas de empresas bajo el prefijo /api/empresas

// Función para insertar datos iniciales si la tabla está vacía
async function seedData() {
  const count = await EmpresaModel.count(); // Cuenta cuántas empresas existen
  if (count === 0) { // Si no hay ninguna, inserta algunos datos de ejemplo
    await EmpresaModel.bulkCreate([
      {
        nombre: "Apple Inc.",
        razonSocial: "Pink Floyd Records S.A.",
        tipoEmpresa: "MEDIANA",
        cantidadEmpleados: 120,
      },
      {
        nombre: "Google LLC",
        razonSocial: "Daft Punk Productions Ltd.",
        tipoEmpresa: "PEQUEÑA",
        cantidadEmpleados: 45,
      },
      {
        nombre: "Microsoft Corp.",
        razonSocial: "Shady Records Inc.",
        tipoEmpresa: "GRANDE",
        cantidadEmpleados: 500,
      }
    ]);
    console.log("Datos de Empresas insertados."); // Mensaje de éxito en consola
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