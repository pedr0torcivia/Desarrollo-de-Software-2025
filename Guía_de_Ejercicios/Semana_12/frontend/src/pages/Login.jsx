import React from 'react'
import { useForm } from 'react-hook-form'
import authService from '../services/auth.service';
import { useNavigate } from 'react-router';
import baseService from '../services/base.service';

export const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const dataLogin = await authService.login(data.mail, data.password);
            baseService.setToken(dataLogin.token);
            baseService.checkHealth();
            navigate(dataLogin.admin ? "/" : "/cliente");
        } catch (error) {
            console.log("Error al iniciar sesión:", error);
        }
    }

  return (
    <div className="container">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Correo Electrónico</label>
          <input {...register("mail", {required: true})} type="email" className="form-control" id="email" required />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Contraseña</label>
          <input {...register("password", {required: true})} type="password" className="form-control" id="password" required />
        </div>
        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  )
}
