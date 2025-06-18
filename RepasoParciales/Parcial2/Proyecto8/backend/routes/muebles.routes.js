import express from 'express'; // Importa el módulo express para manejar rutas y solicitudes HTTP
import { Mueble } from '../models/mueble.js'; // Importa el modelo Mueble desde la carpeta de modelos
import { Op } from 'sequelize'; // Importa operadores de Sequelize para realizar consultas avanzadas

const router = express.Router(); // Crea un enrutador de Express

// Define una ruta GET para obtener muebles
router.get('/', async (req, res) => {
    try {
        const buscar = req.query.buscar; // Obtiene el parámetro de consulta 'buscar' de la solicitud
        const where = {}; // Inicializa un objeto para las condiciones de búsqueda

        // Si se proporciona el parámetro 'buscar', agrega una condición para buscar por nombre
        if (buscar) {
            where.Nombre = { [Op.like]: `%${buscar}%` }; // Busca nombres que contengan el texto proporcionado
        }

        // Busca todos los muebles que cumplan con las condiciones especificadas
        const muebles = await Mueble.findAll({ where });
        res.json(muebles); // Devuelve los muebles encontrados en formato JSON
    } catch (error) {
        console.error('Error al obtener muebles:', error); // Muestra el error en la consola
        res.status(500).json({ error: 'Error al obtener los muebles' }); // Devuelve un error 500 en caso de fallo
    }
});

// En routes/muebles.routes.js
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const mueble = await Mueble.findByPk(id);
    if (!mueble) return res.status(404).json({ error: 'No encontrado' });
    await mueble.update(req.body);
    res.json(mueble);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const mueble = await Mueble.findByPk(id);
    if (!mueble) return res.status(404).json({ error: 'No encontrado' });
    await mueble.destroy();
    res.json({ mensaje: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar' });
  }
});

export default router; // Exporta el enrutador para que pueda ser utilizado en otras partes de la aplicación
