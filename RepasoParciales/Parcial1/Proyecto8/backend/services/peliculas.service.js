// services/turnos.service.js

import { PeliculaModel } from "../databases/db.js";
import { Op } from "sequelize";

// Servicio para operaciones sobre Turno
const peliculasService = {
  // 1. Obtener todas las películas
  async getAll() {
    // SELECT * FROM Pelicula;
    return await PeliculaModel.findAll();
  },

  // 2. Obtener películas filtrando por título y/o género
  async getAllByFiltro({ titulo, genero }) {
    const where = {}; // Objeto de condiciones dinámicas

    // Filtra por coincidencia parcial de título (LIKE '%titulo%')
    if (titulo) {
      where.titulo = { [Op.like]: `%${titulo}%` };
    }

    // Filtra por coincidencia exacta de género
    if (genero) {
      where.genero = genero;
    }

    // SELECT * FROM Pelicula WHERE ...
    return await PeliculaModel.findAll({ where });
  },

  // 3. Crear una nueva película
  async create(data) {
    // Validación de campos obligatorios
    if (
      !data.titulo ||
      !data.director ||
      !data.anioEstreno ||
      !data.genero
    ) {
      throw new Error("Faltan campos obligatorios.");
    }

    // Inserta el registro en la tabla
    return await PeliculaModel.create(data);
  },

  // 4. Eliminar una película por ID
  async remove(id) {
    // Busca la película por ID
    const pelicula = await PeliculaModel.findByPk(id);
    if (!pelicula) return 0; // No existe

    // Elimina la película
    await pelicula.destroy();
    return 1; // Éxito
  }
};

// Exporta el objeto de servicios
export default peliculasService;
