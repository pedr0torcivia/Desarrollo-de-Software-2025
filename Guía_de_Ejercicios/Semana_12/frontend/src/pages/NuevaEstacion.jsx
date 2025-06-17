import React from "react";
import { useForm } from "react-hook-form";
import estacionesService from "../services/estaciones.service";
import barriosService from "../services/barrios.service";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

export const NuevaEstacion = () => {
  const [barrios, setBarrios] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.idBarrio = Number(data.idBarrio);
    await estacionesService.crearEstacion(data);
    navigate("/estaciones");
  };

  useEffect(() => {
    barriosService.obtenerBarrios().then((barrios) => {
      setBarrios(barrios);
    });
  }, []);

  return (
    <div className="container">
      <h3 className="mb-4">Nueva Estación</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="col-md-4">
          <label htmlFor="estacion">Nombre:</label>
          <input
            {...register("nombre", { required: true, maxLength: 20 })}
            className="form-control"
            placeholder="Nombre de la estación"
          />
          {errors.nombre && (
            <span className="text-danger">
              {errors.nombre.type == "required"
                ? "Este campo es obligatorio"
                : "Maximo 20 caracteres"}
            </span>
          )}
        </div>
        <div className="col-md-4">
          <label htmlFor="direccion" className="form-label">
            Direccion:
          </label>
          <input
            {...register("direccion", { required: true })}
            className="form-control"
            placeholder="Dirección de la estación"
          />
          {errors.direccion && (
            <span className="text-danger">Este campo es obligatorio</span>
          )}
        </div>
        <div className="col-md-4">
          <label htmlFor="barrio" className="form-label">
            Barrio:
          </label>
          <select
            className="form-select"
            {...register("idBarrio", { required: true })}
          >
            {barrios.map((barrio) => (
              <option value={barrio.idBarrio} key={barrio.idBarrio}>
                {barrio.nombre}
              </option>
            ))}
          </select>
          {errors.idBarrio && (
            <span className="text-danger">Este campo es obligatorio</span>
          )}
        </div>
        <div className="col-md-4">
          <button type="submit" className="btn btn-primary mt-3">
            Agregar estacion
          </button>
        </div>
      </form>
    </div>
  );
};
