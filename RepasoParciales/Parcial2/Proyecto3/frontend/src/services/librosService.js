import axios from 'axios';

const API_URL = 'http://localhost:3000/api/libros';

export async function obtenerLibros(search = '') {
  try {
    const url = search ? `${API_URL}?search=${encodeURIComponent(search)}` : API_URL;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error al obtener libros:', error);
    throw error;
  }
}
