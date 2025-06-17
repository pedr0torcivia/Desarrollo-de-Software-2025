// src/components/FormularioJuego.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import juegoService from "../services/juegos.service.js";
import axios from "axios";

export default function FormularioJuego() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editando = Boolean(id);

  const [juego, setJuego] = useState({
    nombre: "",
    fechaEstreno: "",
    urlWeb: "",
    genero: "",
    dearrollador: "", // 
    valoracion: "",
    opiniones: "",
    codigoEsrb: "",
    idPlataforma: ""
  });

  const [plataformas, setPlataformas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/plataformas")
      .then(res => setPlataformas(res.data))
      .catch(err => console.error("Error al cargar plataformas:", err));

    if (editando) {
      juegoService.obtenerPorId(id)
        .then(data => {
          setJuego({
            ...data,
            fechaEstreno: new Date(data.fechaEstreno).toISOString().split("T")[0]
          });
        })
        .catch(err => console.error("Error al cargar juego:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJuego(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await juegoService.actualizar(id, juego);
      } else {
        await juegoService.crear(juego);
      }
      navigate("/juegos/lista");
    } catch (err) {
      console.error("❌ Error al guardar juego:", err.response?.data || err);
      alert("❌ Error al guardar: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="card p-4 mt-4">
      <h2>{editando ? "✏️ Editar Juego" : "🆕 Crear Juego"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Nombre</label>
            <input type="text" name="nombre" value={juego.nombre} onChange={handleChange} required className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Género</label>
            <input type="text" name="genero" value={juego.genero} onChange={handleChange} required className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Fecha de Estreno</label>
            <input type="date" name="fechaEstreno" value={juego.fechaEstreno} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Sitio Web</label>
            <input type="url" name="urlWeb" value={juego.urlWeb} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Desarrollador</label>
            <input type="text" name="desarrollador" value={juego.desarrollador} onChange={handleChange} required className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Valoración (0-100)</label>
            <input type="number" name="valoracion" value={juego.valoracion} onChange={handleChange} min="0" max="100" className="form-control" />
          </div>
          <div className="col-md-3">
            <label className="form-label">Opiniones</label>
            <input type="number" name="opiniones" value={juego.opiniones} onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-6">
            <label className="form-label">Plataforma</label>
            <select name="idPlataforma" value={juego.idPlataforma} onChange={handleChange} required className="form-select">
              <option value="">-- Seleccione --</option>
              {plataformas.map(p => (
                <option key={p.id} value={p.id}>{p.nombre}</option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label className="form-label">Clasificación ESRB</label>
            <select name="codigoEsrb" value={juego.codigoEsrb} onChange={handleChange} required className="form-select">
              <option value="">-- Seleccione --</option>
              <option value="E">Everyone</option>
              <option value="E10">Everyone 10+</option>
              <option value="T">Teen</option>
              <option value="M">Mature</option>
              <option value="AO">Adults Only</option>
              <option value="RP">Rating Pending</option>
              <option value="UR">Unrated</option>
            </select>
          </div>
        </div>
        <div className="mt-4 d-flex justify-content-between">
          <button type="submit" className="btn btn-primary">
            {editando ? "Guardar Cambios" : "Crear Juego"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => navigate("/juegos/lista")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
