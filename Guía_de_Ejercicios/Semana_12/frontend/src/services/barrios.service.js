import { api } from './base.service';

const obtenerBarrios = async () => {
    try {
        const response = await api.get('http://localhost:3000/api/barrios/');
        return response.data;
    } catch (err) {
        console.error("Error al obtener los barrios:", err);
        throw err;
    }
}

export default {
    obtenerBarrios
}