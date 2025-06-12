const express = require("express");
const app = express();

const inicializarBase = require("./models/inicializarBase");
app.use(express.json());

const cors = require("cors");
app.use(cors({ origin: "*" }));

// Rutas existentes
const categoriasmock = require("./routes/categoriasmock");
app.use(categoriasmock);
const categoriasRouter = require("./routes/categorias");
app.use(categoriasRouter);
const articulosRouter = require("./routes/articulos");
app.use(articulosRouter);
const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);
const usuariosRouter = require("./routes/usuarios");
app.use(usuariosRouter);

// 🔥 Nueva ruta contratos
const contratosRouter = require("./routes/contratos");
app.use("/api/contratos", contratosRouter);

// 🧠 Carga datos_contratos.json si no hay contratos
const Contrato = require("./models/contratosModel");
const datosContratos = require("./datos_contratos.json");

const cargarDatosContratos = async () => {
  const cantidad = await Contrato.count();
  if (cantidad === 0) {
    await Contrato.bulkCreate(datosContratos);
    console.log("✅ Se cargaron contratos desde datos_contratos.json");
  } else {
    console.log("⚠️ Ya existen contratos, no se cargan datos.");
  }
};

const frontendIncluidoEnPublic = false;
if (frontendIncluidoEnPublic) {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "public")));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Backend inicial dds-backend!");
  });
}

const port = 3000;
app.locals.fechaInicio = new Date();

if (require.main === module) {
  inicializarBase().then(async () => {
    await cargarDatosContratos();
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  });
}

module.exports = app;
