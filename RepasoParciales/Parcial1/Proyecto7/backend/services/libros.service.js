// services/libros.service.js
import { LibroModel } from "../databases/db.js";
import { Op } from "sequelize";

const librosService = {
  // GET todos los libros
  async getAll() {
    return await LibroModel.findAll();
  },

  // GET libros filtrando por título
  async getAllByTitulo(titulo) {
    return await LibroModel.findAll({
      where: {
        Titulo: {
          [Op.like]: `%${titulo}%`,
        },
      },
    });
  },

  // DELETE libro por ID
  async remove(id) {
    const libro = await LibroModel.findByPk(id);
    if (!libro) return 0;
    await libro.destroy();
    return 1;
  },
};

export default librosService;
