// index.js
import express from "express";
import cors from "cors";
import { sequelize, EmpresaModel } from "./databases/db.js";
import empresasRoutes from "./routes/empresas.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api/empresas", empresasRoutes);

async function seedData() {
  const count = await EmpresaModel.count();
  if (count === 0) {
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
    console.log("Datos de Empresas insertados.");
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
