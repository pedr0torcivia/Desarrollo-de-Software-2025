// Importa el modelo Sequelize y el operador 'like'
import { ZapatillaModel } from "../databases/db.js";
import { Op } from "sequelize";

// Servicio que gestiona operaciones sobre Zapatillas
const zapatillasService = {
  // 1. Obtener todas las zapatillas
  async getAll() {
    return await ZapatillaModel.findAll(); // SELECT * FROM Zapatillas;
  },

  // 2. Filtrar por marca y/o modelo (ambos strings)
  async getAllByFiltro({ marca, modelo }) {
    const where = {};

    // Filtro por coincidencia parcial de marca
    if (marca) {
      where.marca = { [Op.like]: `%${marca}%` };
    }

    // Filtro por coincidencia parcial de modelo
    if (modelo) {
      where.modelo = { [Op.like]: `%${modelo}%` };
    }

    return await ZapatillaModel.findAll({ where });
  },

  // 3. Crear una nueva zapatilla
  async create(data) {
    // Validación de campos obligatorios
    if (
      !data.marca ||
      !data.modelo ||
      !data.talle ||
      !data.precio ||
      data.stock == null // incluye cero
    ) {
      throw new Error("Faltan campos obligatorios.");
    }

    return await ZapatillaModel.create(data);
  },

  // 4. Eliminar una zapatilla por ID
  async remove(id) {
    const zapatilla = await ZapatillaModel.findByPk(id);
    if (!zapatilla) return 0;

    await zapatilla.destroy();
    return 1;
  }
};

// Exporta el servicio
export default zapatillasService;
