import axios from "axios";

const API_URL = "http://localhost:4000/api/empleados";

// Obtener todos los empleados (con o sin filtro)
export async function getAll(filtro, pagina = 1) {
  const params = {};
  if (filtro && filtro.trim() !== "") params.ApellidoYNombre = filtro;
  params.Pagina = pagina;

  const response = await axios.get(API_URL, { params });
  return response.data;
}

// Obtener un empleado por ID
export async function getById(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

// Crear un nuevo empleado
export async function create(data) {
  const response = await axios.post(API_URL, data);
  return response.data;
}

// Modificar un empleado
export async function update(id, data) {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
}

// Eliminar un empleado
export async function remove(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}
