import { useEffect, useState } from "react";
import axios from "axios";

export default function Filtro({ filtro, setFiltro, onLimpiar, onBuscar }) {
  const [plataformas, setPlataformas] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/plataformas")
      .then(res => setPlataformas(res.data))
      .catch(err => console.error("Error al obtener plataformas", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFiltro(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card p-3 mb-3">
      <div className="row g-2 align-items-center">
        <div className="col-md-3">
          <input
            type="text"
            name="texto"
            className="form-control"
            placeholder="Buscar por nombre, género o desarrollador"
            value={filtro.texto}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <select
            name="idPlataforma"
            className="form-select"
            value={filtro.idPlataforma}
            onChange={handleChange}
          >
            <option value="">-- Todas las plataformas --</option>
            {plataformas.map(p => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <select
            name="codigoEsrb"
            className="form-select"
            value={filtro.codigoEsrb}
            onChange={handleChange}
          >
            <option value="">-- Todas las clasificaciones --</option>
            <option value="E">Everyone</option>
            <option value="E10">Everyone 10+</option>
            <option value="T">Teen</option>
            <option value="M">Mature</option>
            <option value="AO">Adults Only</option>
            <option value="RP">Rating Pending</option>
            <option value="UR">Unrated</option>
          </select>
        </div>
        <div className="col-md-1">
          <button onClick={onBuscar} className="btn btn-primary w-100">
            Buscar
          </button>
        </div>
        <div className="col-md-2">
          <button onClick={onLimpiar} className="btn btn-secondary w-100">
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
}
