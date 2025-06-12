import axios from 'axios';
import { URL } from '../constants/constants.js';

async function getReservas() {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener reservas:", error);
    return [];
  }
}

async function saveReserva(reserva) {
  try {
    const response = await axios.post(URL, reserva);
    return response.data; // ✅ devolvemos correctamente la data
  } catch (error) {
    console.error("Error al guardar reserva:", error?.response?.data || error.message);
    return { mensaje: "Error al guardar reserva" }; // ✅ evitamos romper el flujo
  }
}

export default { getReservas, saveReserva };
