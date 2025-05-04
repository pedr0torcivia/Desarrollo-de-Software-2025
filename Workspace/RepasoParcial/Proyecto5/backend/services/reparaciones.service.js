// Importa el modelo Reparacion desde la base de datos
import { ReparacionModel } from "../databases/db.js";
import { Op } from "sequelize";

// Define un objeto con las funciones del servicio
const reparacionesService = {
  // 1. Obtener todas las reparaciones
  async getAll() {
    return await ReparacionModel.findAll(); // SELECT * FROM Reparaciones
  },

  // 2. Obtener reparaciones filtradas por nombre del cliente (que comience con...)
  async getAllByCliente(nombreCliente) {
    if (!nombreCliente) {
      throw new Error("Debe especificarse un nombre de cliente para el filtro.");
    }

    return await ReparacionModel.findAll({
      where: {
        nombreCliente: {
          [Op.like]: `${nombreCliente}%`,
        },
      },
    });
  },

  // 3. Agregar una nueva reparación
  async create(data) {
    if (
      !data.fechaRecepcion ||
      !data.nombreCliente ||
      !data.tipoEquipo ||
      !data.descripcionProblema ||
      !data.estado
    ) {
      throw new Error("Faltan campos obligatorios.");
    }

    return await ReparacionModel.create(data);
  },

  // 4. Eliminar una reparación por ID
  async remove(id) {
    const reparacion = await ReparacionModel.findByPk(id);
    if (!reparacion) return 0;

    await reparacion.destroy();
    return 1;
  }
};

// Exporta el servicio
export default reparacionesService;
