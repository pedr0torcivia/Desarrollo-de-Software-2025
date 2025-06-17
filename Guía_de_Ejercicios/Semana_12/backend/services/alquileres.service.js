import AlquilerRepository from "../repositories/AlquilerRepository.js";

class AlquilesService {
    static async crearAlquiler(alquiler, idCuenta) {
        alquiler.idCliente = idCuenta;
        alquiler.estado = 1;
        alquiler.fechaRetiro = new Date();
        alquiler.idTarifa = 1; 
        alquiler.idEstacionDevolucion = 2;
        alquiler.fechaDevolucion = new Date(new Date().getTime() + 2 * 60 * 60 * 1000); 
        const alquilerCreado = await AlquilerRepository.crear(alquiler);
        return alquilerCreado;
    }
}

export default AlquilesService;