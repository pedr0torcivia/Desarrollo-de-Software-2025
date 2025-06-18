// backend/src/index.js
const express = require("express");
const cors = require("cors");
const sequelize = require("./database/database");
const Paciente = require("./models/Paciente");
const routerPacientes = require("./routes/pacientes.routes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/pacientes", routerPacientes);

sequelize.sync({ force: true }).then(async () => {
  console.log("Base de datos sincronizada");

  // Datos de ejemplo (seeding)
  await Paciente.bulkCreate([
    { NombreMascota: "Firulais", Propietario: "Carlos Pérez", Telefono: "3511234567" },
    { NombreMascota: "Mishi", Propietario: "Laura Gómez", Telefono: "3517654321" },
    { NombreMascota: "Toby", Propietario: "María López" }
  ]);

  app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
});
