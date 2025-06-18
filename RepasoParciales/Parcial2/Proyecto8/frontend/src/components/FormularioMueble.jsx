// frontend/src/components/FormularioMueble.jsx
import { useState, useEffect } from 'react';

export default function FormularioMueble({ datosIniciales, onGuardar, onCancelar }) {
  const [form, setForm] = useState({
    Nombre: '',
    Material: '',
    FechaFabricacion: '',
    PrecioEstimado: ''
  });

  useEffect(() => {
    if (datosIniciales)
      setForm({ ...datosIniciales });
  }, [datosIniciales]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(form);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 mb-3">
      <h4>{datosIniciales?.IdMueble ? 'Editar Mueble' : 'Nuevo Mueble'}</h4>

      <div className="mb-2">
        <label className="form-label">Nombre</label>
        <input
          className="form-control"
          name="Nombre"
          value={form.Nombre}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Material</label>
        <input
          className="form-control"
          name="Material"
          value={form.Material}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Fecha de Fabricación</label>
        <input
          className="form-control"
          name="FechaFabricacion"
          type="date"
          value={form.FechaFabricacion}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label className="form-label">Precio Estimado</label>
        <input
          className="form-control"
          name="PrecioEstimado"
          type="number"
          value={form.PrecioEstimado}
          step="0.01"
          onChange={handleChange}
          required
        />
      </div>

      <button className="btn btn-success me-2" type="submit">
        Guardar
      </button>
      <button className="btn btn-secondary" type="button" onClick={onCancelar}>
        Cancelar
      </button>
    </form>
  );
}
