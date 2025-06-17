// src/components/UltimosEstrenos.jsx
import { useEffect, useState } from "react";
import juegoService from "../services/juegos.service";

export default function UltimosEstrenos() {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    const obtener = async () => {
      try {
        const lista = await juegoService.getUltimosEstrenos();
        setJuegos(lista);
      } catch (err) {
        console.error("Error al obtener estrenos:", err);
      }
    };
    obtener();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">📅 Últimos Estrenos</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>Nombre</th>
              <th>Plataforma</th>
              <th>Fecha</th>
              <th>Desarrollador</th>
              <th>Valoración</th>
            </tr>
          </thead>
          <tbody>
            {juegos.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center">No se encontraron estrenos.</td>
              </tr>
            ) : (
              juegos.map(juego => (
                <tr key={juego.id}>
                  <td>{juego.nombre}</td>
                  <td>{juego.plataforma?.nombre || "-"}</td>
                  <td>{formatearFecha(juego.fechaEstreno)}</td>
                  <td>{juego.dearrollador}</td>
                  <td className="text-center">{renderEstrellas(juego.valoracion)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ⭐ Valoración visual
function renderEstrellas(valoracion) {
  const estrellas = Math.round(valoracion / 20);
  return "★".repeat(estrellas).padEnd(5, "☆");
}

// 📆 Fecha legible
function formatearFecha(fecha) {
  return new Date(fecha).toLocaleDateString("es-AR");
}
