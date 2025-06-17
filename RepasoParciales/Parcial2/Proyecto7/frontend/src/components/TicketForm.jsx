import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function TicketForm({ refrescar }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/tickets", data);
      refrescar();   // Llama a App.js para recargar la lista
      reset();       // Limpia el formulario
    } catch (error) {
      console.error("Error al crear ticket:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
      <div className="col-md-6">
        <label className="form-label">Nombre de la Tarea</label>
        <input
          type="text"
          className={`form-control ${errors.nombreTarea ? "is-invalid" : ""}`}
          {...register("nombreTarea", { required: true })}
        />
        {errors.nombreTarea && (
          <div className="invalid-feedback">Campo obligatorio</div>
        )}
      </div>

      <div className="col-md-3">
        <label className="form-label">Fecha</label>
        <input
          type="date"
          className={`form-control ${errors.fecha ? "is-invalid" : ""}`}
          {...register("fecha", { required: true })}
        />
        {errors.fecha && (
          <div className="invalid-feedback">Fecha requerida</div>
        )}
      </div>

      <div className="col-md-3">
        <label className="form-label">Prioridad (1-10)</label>
        <input
          type="number"
          className={`form-control ${errors.prioridad ? "is-invalid" : ""}`}
          {...register("prioridad", {
            required: true,
            min: 1,
            max: 10
          })}
        />
        {errors.prioridad && (
          <div className="invalid-feedback">
            Prioridad debe estar entre 1 y 10
          </div>
        )}
      </div>

      <div className="col-12 text-end">
        <button type="submit" className="btn btn-primary">
          Crear Ticket
        </button>
      </div>
    </form>
  );
}
