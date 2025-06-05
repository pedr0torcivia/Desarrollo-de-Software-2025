// backend/services/empresas.service.js

// Importa el modelo de empresa desde la base de datos
import { PacienteModel } from "../databases/db.js";

// Define un objeto que contiene funciones reutilizables para interactuar con la base de datos
const pacientesServices = {
  // Obtiene todas las empresas de la base de datos
  async getAll() {
    return await PacienteModel.findAll(); // SELECT * FROM empresas
  },

  // Busca una empresa por su ID
  async getById(id) {
    const paciente = await PacienteModel.findByPk(id); // SELECT * FROM empresas WHERE id = ?
    return paciente || null; // Devuelve null si no existe
  },

  // Crea una nueva empresa, validando los datos mínimos necesarios
  async create(data) {
    // Verifica que todos los campos requeridos estén presentes y válidos
    if (!data.propietario || !data.nombreMascota || !data.telefono) {
      throw new Error("Datos incompletos o inválidos"); // Arroja error si falta algo
    }
    return await PacienteModel.create(data); // INSERT INTO empresas ...
  },

  // Actualiza una empresa existente si existe
  async update(id, data) {
    const paciente = await PacienteModel.findByPk(id); // Busca por ID
    if (!paciente) return null; // Si no existe, devuelve null

    await paciente.update(data); // Actualiza los datos
    return paciente; // Devuelve la empresa actualizada
  },

  // Elimina una empresa por ID
  async remove(id) {
    const paciente = await PacienteModel.findByPk(id); // Busca la empresa
    if (!paciente) return 0; // Si no existe, devuelve 0

    await paciente.destroy(); // Elimina de la base de datos
    return 1; // Devuelve 1 si se eliminó correctamente
  },
};

// Exporta el objeto de servicios para ser usado en otros archivos (como controladores o rutas)
export default pacientesServices;

