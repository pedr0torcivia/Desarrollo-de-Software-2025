import React, { useState } from "react";
import { useEffect } from "react";
import estacionesService from "../services/estaciones.service";

const estacionesArray = [
  {
    numero: 1,
    estacion: "Plaza San Martín",
    direccion: "Entre Ríos 50",
    barrio: "Centro",
    activo: true,
  },
  {
    numero: 2,
    estacion: "Terminal de Ómnibus",
    direccion: "Bv. Perón 380",
    barrio: "Nueva Córdoba",
    activo: true,
  },
  {
    numero: 3,
    estacion: "Ciudad Universitaria",
    direccion: "Av. Haya de la Torre 500",
    barrio: "Ciudad Universitaria",
    activo: true,
  },
  {
    numero: 4,
    estacion: "Parque Sarmiento",
    direccion: "Av. Deodoro Roca s/n",
    barrio: "Nueva Córdoba",
    activo: false,
  },
  {
    numero: 5,
    estacion: "Plaza España",
    direccion: "Av. Lugones y Av. Chacabuco",
    barrio: "Nueva Córdoba",
    activo: true,
  },
  {
    numero: 6,
    estacion: "Costanera Norte",
    direccion: "Av. Costanera y Jujuy",
    barrio: "General Paz",
    activo: true,
  },
  {
    numero: 7,
    estacion: "Plaza Alberdi",
    direccion: "Av. Colón y Gral. Paz",
    barrio: "Alberdi",
    activo: false,
  },
  {
    numero: 8,
    estacion: "Patio Olmos",
    direccion: "Av. Vélez Sarsfield 361",
    barrio: "Centro",
    activo: true,
  },
  {
    numero: 9,
    estacion: "Parque Las Heras",
    direccion: "Av. Costanera y Santa Fe",
    barrio: "General Paz",
    activo: true,
  },
  {
    numero: 10,
    estacion: "Barrio Jardín",
    direccion: "Ricardo Rojas 1350",
    barrio: "Jardín",
    activo: false,
  },
];

export const Estaciones = () => {
  const [estaciones, setEstaciones] = useState([]);
  const [filtroEstacion, setFiltroEstacion] = useState("");

  const filtrarPorNombre = () => {
    const estacionesFiltradas = estacionesArray.filter((estacion) =>
      estacion.estacion.toLowerCase().includes(filtroEstacion.toLowerCase())
    );
    setEstaciones(estacionesFiltradas);
  };

  useEffect(() => {
    estacionesService.obtenerEstaciones().then((estaciones) => {
      setEstaciones(estaciones);
    }
  );
  },[])

  return (
    <main className="container my-5">
      <h1 className="mb-4">Lista de Estaciones</h1>

      <form className="row g-3 mb-4">
        <div className="col-md-4">
          <label htmlFor="texto" className="form-label">
            Texto:
          </label>
          <input
            type="text"
            onChange={(e) => setFiltroEstacion(e.target.value)}
            className="form-control"
            id="texto"
            name="texto"
            placeholder="Texto a filtrar"
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="barrio" className="form-label">
            Barrio:
          </label>
          <select className="form-select" name="barrio" id="barrio">
            <option value="Todos" selected>
              Todos
            </option>
            <option value="Nueva Córdoba">Nueva Córdoba</option>
            <option value="Centro">Centro</option>
            <option value="Ciudad Universitaria">Ciudad Universitaria</option>
            <option value="General Paz">General Paz</option>
            <option value="Alberdi">Alberdi</option>
            <option value="Jardín">Jardín</option>
          </select>
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <div className="form-check htmlForm-switch">
            <input
              className="form-check-input"
              type="checkbox"
              name="inactivos"
              id="inactivos"
              checked="false"
            />
            <label className="form-check-label" htmlFor="inactivos">
              Incluir Inactivos
            </label>
          </div>
        </div>
        <div className="col-md-2 d-flex align-items-end justify-content-end">
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={() => filtrarPorNombre()}
          >
            Filtrar
          </button>
        </div>
      </form>

      <table className="table table-bordered table-striped">
        <thead className="table-primary">
          <tr>
            <th>Nro</th>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>Barrio</th>
            <th>Activo</th>
          </tr>
        </thead>
        <tbody>
          {estaciones.map((estacion, index) => (
            <tr key={index}>
              <td>{estacion.idEstacion}</td>
              <td>{estacion.nombre}</td>
              <td>{estacion.direccion}</td>
              <td>{estacion.barrio?.nombre}</td>
              <td>{estacion.activo ? "Sí" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
