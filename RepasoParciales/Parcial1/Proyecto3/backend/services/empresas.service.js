// backend/services/empresas.service.js

// Importa el modelo de empresa desde la base de datos
import { EmpresaModel } from "../databases/db.js";

// Define un objeto que contiene funciones reutilizables para interactuar con la base de datos
const empresasServices = {
  // Obtiene todas las empresas de la base de datos
  async getAll() {
    return await EmpresaModel.findAll(); // SELECT * FROM empresas
  },

  // Busca una empresa por su ID
  async getById(id) {
    const empresa = await EmpresaModel.findByPk(id); // SELECT * FROM empresas WHERE id = ?
    return empresa || null; // Devuelve null si no existe
  },

  // Crea una nueva empresa, validando los datos mínimos necesarios
  async create(data) {
    // Verifica que todos los campos requeridos estén presentes y válidos
    if (!data.nombre || !data.razonSocial || !data.tipoEmpresa || typeof data.cantidadEmpleados !== 'number') {
      throw new Error("Datos incompletos o inválidos"); // Arroja error si falta algo
    }
    return await EmpresaModel.create(data); // INSERT INTO empresas ...
  },

  // Actualiza una empresa existente si existe
  async update(id, data) {
    const empresa = await EmpresaModel.findByPk(id); // Busca por ID
    if (!empresa) return null; // Si no existe, devuelve null

    await empresa.update(data); // Actualiza los datos
    return empresa; // Devuelve la empresa actualizada
  },

  // Elimina una empresa por ID
  async remove(id) {
    const empresa = await EmpresaModel.findByPk(id); // Busca la empresa
    if (!empresa) return 0; // Si no existe, devuelve 0

    await empresa.destroy(); // Elimina de la base de datos
    return 1; // Devuelve 1 si se eliminó correctamente
  },
};

// Exporta el objeto de servicios para ser usado en otros archivos (como controladores o rutas)
export default empresasServices;

