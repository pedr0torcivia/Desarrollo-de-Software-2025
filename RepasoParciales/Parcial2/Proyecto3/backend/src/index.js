const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./database/database');
const libroRoutes = require('./routes/libros.routes');
const Libro = require('./models/Libro');

app.use(cors());
app.use(express.json());
app.use('/api/libros', libroRoutes);

// Carga inicial con 40 libros si la tabla está vacía
async function cargarDatosIniciales() {
  const cantidad = await Libro.count();
  if (cantidad === 0) {
    const librosIniciales = Array.from({ length: 40 }, (_, i) => ({
      Titulo: `Libro ${i + 1}`,
      Autor: `Autor ${i + 1}`,
      AnioPublicacion: 2000 + (i % 24)
    }));
    await Libro.bulkCreate(librosIniciales);
    console.log('✔ Se cargaron 40 libros iniciales.');
  }
}

sequelize.sync().then(async () => {
  await cargarDatosIniciales();
  app.listen(3000, () => {
    console.log('Servidor backend escuchando en http://localhost:3000');
  });
});
