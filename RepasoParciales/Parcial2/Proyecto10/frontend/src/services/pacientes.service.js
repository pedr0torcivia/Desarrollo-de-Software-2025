// frontend/src/services/pacientes.service.js
import axios from "axios";

const URL = "http://localhost:3000/api/pacientes";

export const getAll = (filtro) =>
  axios.get(filtro ? `${URL}?propietario=${filtro}` : URL);

export const getById = (id) => axios.get(`${URL}/${id}`);

export const create = (paciente) => axios.post(URL, paciente);

export const update = (id, paciente) => axios.put(`${URL}/${id}`, paciente);

export const remove = (id) => axios.delete(`${URL}/${id}`);
