import { useState, useEffect } from "react";

export default function Formulario({ producto, onGuardar, onCancelar }) {
  const [form, setForm] = useState({ nombre: "", precio: "", stock: "", fechaAlta: "" });

  useEffect(() => { if (producto) setForm(producto); }, [producto]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.precio || !form.stock || !form.fechaAlta) {
      alert("Todos los campos son obligatorios");
      return;
    }
    onGuardar(form);
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input name="nombre" value={form.nombre} onChange={handleChange} className="form-control" />
      </div>
      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input name="precio" type="number" value={form.precio} onChange={handleChange} className="form-control" min={0} step="0.01" />
      </div>
      <div className="mb-3">
        <label className="form-label">Stock</label>
        <input name="stock" type="number" value={form.stock} onChange={handleChange} className="form-control" min={0} />
      </div>
      <div className="mb-3">
        <label className="form-label">Fecha Alta</label>
        <input name="fechaAlta" type="date" value={form.fechaAlta} onChange={handleChange} className="form-control" />
      </div>
      <div className="d-flex justify-content-end">
        <button type="submit" className="btn btn-success me-2">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}
