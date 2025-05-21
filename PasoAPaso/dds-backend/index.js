const express = require("express"); // importamos express
const app = express();              // creamos la app de express
app.use(express.json());           // middleware para poder leer JSON en req.body
require("./base-orm/sqlite-init");  // crear base si no existe

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

// levantar el servidor en puerto 3000
const port = 3000;
app.listen(port, () => {
  console.log(`sitio escuchando en el puerto ${port}`);
});
