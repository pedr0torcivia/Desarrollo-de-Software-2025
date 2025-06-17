import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import barriosService from '../services/barrios.service';
import authService from '../services/auth.service';
import { useNavigate } from 'react-router';

export const Register = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [barrios, setBarrios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBarrios = async () => {
            try {
                const data = await barriosService.obtenerBarrios();
                setBarrios(data);
            } catch (error) {
                console.error("Error fetching barrios:", error);
            }
        }

        fetchBarrios();
    },[])

    const onSubmit = async (data) => {
        try {
            console.log(data);
            
            const dataRegister = await authService.register(
                data.nombre, 
                data.apellido, 
                data.direccion, 
                data.idBarrio,
                data.mail, 
                data.password
            );
            navigate('/iniciar-sesion');
        } catch (error) {
            console.error("Error al registrar:", error);
        }
    }

  return (
    <div className="container">
      <h1>Registro</h1>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input {...register("nombre", {required:true})} type="text" className="form-control" id="name" />
        </div>
        <div className="mb-3">
            <label htmlFor="surname" className="form-label">Apellido</label>
            <input {...register("apellido", {required:true})} type="text" className="form-control" id="surname" />
        </div>
        <div className="mb-3">
            <label htmlFor="direccion" className="form-label">Direccion</label>
            <input {...register("direccion", {required:true})} type="text" className="form-control" id="direccion" />
        </div>
        <div className="mb-3">
            <label htmlFor="barrio" className="form-label">Barrio</label>
            <select {...register("idBarrio", {required: true})} className="form-select" id="barrio" >
                <option value="">Seleccione un barrio</option>
                {barrios.map((barrio) => (
                    <option key={barrio.idBarrio} value={barrio.idBarrio}>{barrio.nombre}</option>
                ))}
            </select>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input {...register("mail", {required:true})} type="email" className="form-control" id="email" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input {...register("password", {required:true})} type="password" className="form-control" id="password" />
        </div>
        <button type="submit" className="btn btn-primary">Registrar</button>
      </form>
    </div>
  )
}
