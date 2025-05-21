const express = require("express"); // importamos express
const app = express();              // creamos la app de express
app.use(express.json());           // middleware para poder leer JSON en req.body
require("./base-orm/sqlite-init");  // crear base si no existe
const auth = require("./seguridad/auth");  // importar el módulo de autenticación


// ruta de prueba raíz
app.get("/", (req, res) => {
  res.send("Backend inicial dds-backend!");
});

// importar el router de articulosfamiliasmock
const articulosfamiliasmockRouter = require("./routes/articulosfamiliasmock");

// montar el router en la app
app.use(articulosfamiliasmockRouter);

// importar el router de articulosfamilias
const articulosfamiliasRouter = require("./routes/articulosfamilias");
app.use(articulosfamiliasRouter);

// importar el router de articulos
const articulosRouter = require("./routes/articulos");
app.use(articulosRouter);

// configurar servidor
const cors = require("cors");
app.use(
  cors({
    origin: "*", // origin: 'https://dds-frontend.azurewebsites.net'
  })
);

// importar el router de seguridad
const seguridadRouter = require("./routes/seguridad");
app.use(seguridadRouter);

// levantar el servidor en puerto 3000
const port = 3000;
app.listen(port, () => {
  console.log(`sitio escuchando en el puerto ${port}`);
});
