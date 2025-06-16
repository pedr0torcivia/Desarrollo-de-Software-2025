import { useState } from 'react';
import { deudoresService } from '../services/deudores.service';

export default function RegistroDeudores({ onVolver }) {
  const [form, setForm] = useState({
    nombreCompleto: '',
    importe: '',
    fechaDeuda: '',
    fechaLimitePago: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await deudoresService.create(form);
      alert('Deudor registrado correctamente');
      onVolver(); // vuelve al listado y recarga
    } catch (error) {
      alert('Error al registrar el deudor');
    }
  };

  return (
    <div>
      <h3>Registrar Deudor</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Apellido y Nombre:</label>
          <input
            name="nombreCompleto"
            className="form-control"
            value={form.nombreCompleto}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha de Deuda:</label>
          <input
            type="date"
            name="fechaDeuda"
            className="form-control"
            value={form.fechaDeuda}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Fecha Límite de Pago:</label>
          <input
            type="date"
            name="fechaLimitePago"
            className="form-control"
            value={form.fechaLimitePago}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Importe:</label>
          <input
            type="number"
            step="0.01"
            name="importe"
            className="form-control"
            value={form.importe}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success me-2">Registrar</button>
        <button type="button" className="btn btn-secondary" onClick={onVolver}>Volver</button>
      </form>
    </div>
  );
}
