import { EmpresaModel } from "../databases/db.js";

const empresasServices = {
  async getAll() {
    return await EmpresaModel.findAll();
  },

  async getById(id) {
    const empresa = await EmpresaModel.findByPk(id);
    return empresa || null;
  },

  async create(data) {
    if (!data.nombre || !data.razonSocial || !data.tipoEmpresa || typeof data.cantidadEmpleados !== 'number') {
      throw new Error("Datos incompletos o inválidos");
    }
    return await EmpresaModel.create(data);
  },

  async update(id, data) {
    const empresa = await EmpresaModel.findByPk(id);
    if (!empresa) return null;

    await empresa.update(data);
    return empresa;
  },

  async remove(id) {
    const empresa = await EmpresaModel.findByPk(id);
    if (!empresa) return 0;

    await empresa.destroy();
    return 1; // Eliminado correctamente
  },
};

export default empresasServices;
