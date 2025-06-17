import { api } from "./base.service"

const crearAlquiler = async (monto, idEstacionRetiro) => {
    const response = await api.post(
        "http://localhost:3000/api/alquileres/",
        {
            monto,
            idEstacionRetiro
        }
    );
    return response.data;
}

export default {
    crearAlquiler
}