import { useState } from "react";

const Equipof1Buscar = ({ onBuscar, onAgregar }) => {
  const [nombre, setNombre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onBuscar(nombre);
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <div className="row g-2 align-items-end">
        <div className="col-md-6">
          <label className="form-label">Nombre del Corredor</label>
          <input
            type="text"
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Buscar por corredor"
          />
        </div>
        <div className="col-md-3 d-grid">
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </div>
        <div className="col-md-3 d-grid">
          <button type="button" className="btn btn-success" onClick={onAgregar}>
            Agregar
          </button>
        </div>
      </div>
    </form>
  );
};

export default Equipof1Buscar;
