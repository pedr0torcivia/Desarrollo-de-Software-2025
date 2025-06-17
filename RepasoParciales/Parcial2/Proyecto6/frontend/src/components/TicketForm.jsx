// frontend/src/components/TicketForm.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createTicket } from '../services/ticket.service';

export default function TicketForm({ onTicketCreado }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  const [mensajeExito, setMensajeExito] = useState('');

  const onSubmit = async (data) => {
    try {
      await createTicket(data);
      onTicketCreado();
      reset();
      setMensajeExito('✅ Ticket creado exitosamente');

      setTimeout(() => setMensajeExito(''), 3000);
    } catch (error) {
      alert("❌ Error al crear el ticket");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      <h4 className="mb-3 text-primary">
        <i className="bi bi-plus-circle-fill me-2"></i>Agregar nuevo ticket
      </h4>

      {mensajeExito && (
        <div className="alert alert-success text-center">{mensajeExito}</div>
      )}

      <div className="row g-3">
        <div className="col-md-12">
          <label className="form-label">Nombre de Tarea</label>
          <input
            className={`form-control ${errors.nombreTarea ? 'is-invalid' : ''}`}
            {...register('nombreTarea', { required: true })}
          />
          {errors.nombreTarea && (
            <div className="invalid-feedback">Campo obligatorio</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Fecha</label>
          <input
            type="date"
            className={`form-control ${errors.fecha ? 'is-invalid' : ''}`}
            {...register('fecha', { required: true })}
          />
          {errors.fecha && (
            <div className="invalid-feedback">Campo obligatorio</div>
          )}
        </div>

        <div className="col-md-6">
          <label className="form-label">Prioridad (1 a 10)</label>
          <input
            type="number"
            min="1"
            max="10"
            className={`form-control ${errors.prioridad ? 'is-invalid' : ''}`}
            {...register('prioridad', {
              required: true,
              min: 1,
              max: 10
            })}
          />
          {errors.prioridad && (
            <div className="invalid-feedback">Debe ser entre 1 y 10</div>
          )}
        </div>
      </div>

      <div className="text-end mt-4">
        <button type="submit" className="btn btn-success px-4">
          <i className="bi bi-save me-2"></i>Agregar Ticket
        </button>
      </div>
    </form>
  );
}
