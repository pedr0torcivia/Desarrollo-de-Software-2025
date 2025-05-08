import { ParcialModel } from "../databases/db.js";

const parcialesService = {
  async getAll() {
    return await ParcialModel.findAll();
  },

  async getAllByLegajo(legajo) {
    if (!legajo) return await ParcialModel.findAll();
    return await ParcialModel.findAll({
      where: { legajoAlumno: parseInt(legajo) }
    });
  },

  async create(data) {
    if (
      !data.legajoAlumno ||
      !data.nombreAlumno ||
      !data.apellidoAlumno ||
      !data.materia
    ) {
      throw new Error("Faltan campos obligatorios.");
    }

    return await ParcialModel.create(data);
  },

  async remove(id) {
    const parcial = await ParcialModel.findByPk(id);
    if (!parcial) return 0;
    await parcial.destroy();
    return 1;
  }
};

export default parcialesService;
