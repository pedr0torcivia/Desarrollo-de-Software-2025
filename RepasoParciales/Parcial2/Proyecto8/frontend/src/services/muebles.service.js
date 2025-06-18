import axios from 'axios';

const API_URL = 'http://localhost:3000/api/muebles';

export const update = (id, datos) => axios.put(`${API_URL}/${id}`, datos);
export const remove = (id) => axios.delete(`${API_URL}/${id}`);
export const getAll = () => axios.get(API_URL);
export const getByNombre = (nombre) =>
  axios.get(`${API_URL}?buscar=${encodeURIComponent(nombre)}`);
