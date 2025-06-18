// frontend/src/components/PacienteForm.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function PacienteForm({ inicial, onGuardar, onCancelar }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // Cargar datos si es edición
  useEffect(() => {
    reset(inicial || { NombreMascota: "", Propietario: "", Telefono: "" });
  }, [inicial, reset]);

  const onSubmit = (data) => {
    onGuardar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border p-4 rounded bg-light">
      <h4>{inicial ? "Modificar Paciente" : "Nuevo Paciente"}</h4>

      <div className="mb-3">
        <label className="form-label">Nombre de la Mascota</label>
        <input
          className={`form-control ${errors.NombreMascota ? "is-invalid" : ""}`}
          {...register("NombreMascota", { required: true })}
        />
        {errors.NombreMascota && (
          <div className="invalid-feedback">Este campo es obligatorio</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Propietario</label>
        <input
          className={`form-control ${errors.Propietario ? "is-invalid" : ""}`}
          {...register("Propietario", { required: true })}
        />
        {errors.Propietario && (
          <div className="invalid-feedback">Este campo es obligatorio</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          className="form-control"
          {...register("Telefono")}
        />
      </div>

      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-success me-2">
          Guardar
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancelar}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
