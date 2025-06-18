// src/services/libros.service.js
import axios from 'axios';

const URL = "http://localhost:3001/api/libros";

export async function getAll(search = '') {
  const params = search ? { params: { search } } : {};
  return await axios.get(URL, params);
}

export async function getById(id) {
  return await axios.get(`${URL}/${id}`);
}

export async function create(libro) {
  return await axios.post(URL, libro);
}

export async function update(id, libro) {
  return await axios.put(`${URL}/${id}`, libro);
}

export async function remove(id) {
  return await axios.delete(`${URL}/${id}`);
}
