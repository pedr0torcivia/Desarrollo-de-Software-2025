// Importa Express para construir el servidor HTTP
import express from 'express';
// Importa CORS para permitir que el frontend acceda a este backend desde otro origen (localhost distinto)
import cors from 'cors';
// Importa el router de muebles desde la carpeta de rutas
import mueblesRouter from './routes/muebles.routes.js';
// Importa la instancia de conexión Sequelize a la base de datos
import { sequelize } from './databases/db.js';
// Importa la función que inserta los 40 muebles iniciales si la base está vacía
import { seedDatabase } from './services/muebles.service.js';

// Crea aplicación express
const app = express();
// Defino el puerto donde se ejecutará el servidor
const PORT = 3000;

// Aplica el middleware de CORS para permitir peticiones cross-origin (por ejemplo desde localhost:5500)
app.use(cors());
// Permite que Express entienda cuerpos de solicitudes JSON
app.use(express.json());

// Ruta raíz de prueba (verificar que el backend está activo)
app.get('/', (req, res) => {
  res.send('¡Backend de Gestión de Muebles Funcionando!');
});

// Usa el router de muebles para todas las rutas que empiecen con /api/muebles
app.use('/api/muebles', mueblesRouter);

// Sincroniza los modelos con la base de datos.
// El flag { force: true } borra y recrea las tablas en cada reinicio (modo desarrollo)
sequelize.sync({ force: true })
  .then(async () => {
    console.log('📂 Base sincronizada.');
        // Llama a la función para insertar los 40 muebles (si no hay ninguno)
    await seedDatabase();
        // Levanta el servidor Express en el puerto 3000
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al iniciar servidor:', err);
  });
