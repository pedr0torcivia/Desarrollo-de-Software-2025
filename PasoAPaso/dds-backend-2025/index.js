const express = require('express');

// crear servidor
const app = express();

const inicializarBase = require('./models/inicializarBase');

app.use(express.json()); // para poder leer json en el body

const cors = require('cors');
app.use(
  cors({
    origin: '*', // para que acepte peticiones de cualquier origen
  })
);

const categoriasRouter = require('./routes/categorias');
app.use(categoriasRouter);
const articulosRouter = require('./routes/articulos');
app.use(articulosRouter);
const seguridadRouter = require('./routes/seguridad');
app.use(seguridadRouter);
const usuariosRouter = require('./routes/usuarios');
app.use(usuariosRouter);

const frontendIncluidoEnPublic = true;
if (frontendIncluidoEnPublic) {
  // el siguiente bloque de codigo permite corre el frontende junto al backend
  // para lo cual se debe tener una carpeta public en la raiz del proyecto, con codigo del frontend
  // y en el package.json agregar el siguiente script
  // "start": "node index.js",
  const path = require('path');
  // Servir archivos estáticos (JS, CSS, imágenes)
  app.use(express.static(path.join(__dirname, 'pages')));
  // Ruta comodín para servir el index.html (DESPUÉS DE LAS RUTAS DE LA API)
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Backend inicial dds-backend!');
  });
}

// levantar servidor
const port = 3000;
app.locals.fechaInicio = new Date(); // fecha y hora inicio de aplicacion

if (require.main === module) {
  // si no es llamado por otro módulo, es decir, si es el módulo principal -> levantamos el servidor
  inicializarBase().then(() => {
    app.listen(port, () => {
      console.log(`sitio escuchando en el puerto ${port}`);
    });
  });
}
module.exports = app; // para testing
