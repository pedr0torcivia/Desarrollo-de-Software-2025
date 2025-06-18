import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function EmpleadoRegistro({ datosIniciales, onVolver, onGuardar }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (datosIniciales) {
      reset(datosIniciales);
    } else {
      reset({
        ApellidoYNombre: "",
        Dni: "",
        Email: "",
        FechaNacimiento: ""
      });
    }
  }, [datosIniciales, reset]);

  const onSubmit = (data) => {
    if (datosIniciales) {
      data.IdEmpleado = datosIniciales.IdEmpleado;
    }
    onGuardar(data);
  };

  return (
    <div className="card p-4">
      <h2>{datosIniciales ? "Modificar Empleado" : "Nuevo Empleado"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label>Apellido y Nombre</label>
          <input
            className={`form-control ${errors.ApellidoYNombre ? "is-invalid" : ""}`}
            {...register("ApellidoYNombre", { required: true })}
          />
          {errors.ApellidoYNombre && <div className="invalid-feedback">Campo requerido</div>}
        </div>

        <div className="mb-3">
          <label>DNI</label>
          <input
            type="number"
            className={`form-control ${errors.Dni ? "is-invalid" : ""}`}
            {...register("Dni", { required: true })}
          />
          {errors.Dni && <div className="invalid-feedback">Campo requerido</div>}
        </div>

        <div className="mb-3">
          <label>Fecha de Nacimiento</label>
          <input
            type="date"
            className={`form-control ${errors.FechaNacimiento ? "is-invalid" : ""}`}
            {...register("FechaNacimiento", { required: true })}
          />
          {errors.FechaNacimiento && <div className="invalid-feedback">Campo requerido</div>}
        </div>

        <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-secondary" onClick={onVolver}>
            Volver
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
}
