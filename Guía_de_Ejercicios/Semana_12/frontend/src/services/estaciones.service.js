import { api } from "./base.service";

const crearEstacion = async (estacion) => {
  try {
    const response = await api.post(
      "http://localhost:3000/api/estaciones/",
        estacion
    );
    return response.data;
  } catch (err) {

  }
};

const obtenerEstaciones = async () => {
    try {
        const response = await api.get("http://localhost:3000/api/estaciones/");
        return response.data;
    } catch (err) {
        console.error("Error al obtener las estaciones:", err);
        throw err;
    }
    }

export default {
    crearEstacion,
    obtenerEstaciones
}
