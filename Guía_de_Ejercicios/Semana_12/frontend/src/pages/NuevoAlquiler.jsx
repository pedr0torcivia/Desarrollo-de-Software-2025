import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import estacionesService from '../services/estaciones.service';
import alquileresService from '../services/alquileres.service';

export const NuevoAlquiler = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [estaciones, setEstaciones] = useState([]);

    useEffect(() => {
        const fetchEstaciones = async () => {
            try {
                const data = await estacionesService.obtenerEstaciones();
                setEstaciones(data);
            } catch (error) {
                console.error("Error fetching estaciones:", error);
            }
        }

        fetchEstaciones();
    },[])

    const onSubmit = async (data) => {
        try {
            const dataAlquiler = await alquileresService.crearAlquiler(data.monto, data.idEstacion)
            console.log("Alquiler creado:", dataAlquiler);
        } catch (error) {
            console.error("Error al crear el alquiler:", error);
        }
    }

  return (
    <div className='container' >
        <h1>Nuevo Alquiler</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
            <label htmlFor="monto" className="form-label">Monto</label>
            <input {...register("monto", {required: true})}  type="text" className="form-control"/>
            </div>
            <div className="mb-3">
            <label htmlFor="estacion" className="form-label">Estacion</label>
            <select {...register("idEstacion", {required: true})} className="form-select" id="estacion">
                <option value="">Seleccione una estación</option>
                {estaciones.map((estacion) => (
                    <option key={estacion.idEstacion} value={estacion.idEstacion}>
                        {estacion.nombre} - {estacion.direccion}
                    </option>
                ))}
            </select>
            </div>
            <button type="submit" className="btn btn-primary">Registrar Alquiler</button>
        </form>
    </div>
  )
}
