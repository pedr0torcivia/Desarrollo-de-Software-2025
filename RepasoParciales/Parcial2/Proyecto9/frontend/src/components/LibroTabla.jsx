// src/components/LibroTabla.jsx
import React from 'react';

export default function LibroTabla({ libros, onEditar, onEliminar }) {
  return (
    <div className="container mt-4">
      <h2>Listado de Libros</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id}>
              <td>{libro.id}</td>
              <td>{libro.Titulo}</td>
              <td>{libro.Autor}</td>
              <td>{libro.AnioPublicacion}</td>
              <td>
                <button className="btn btn-warning me-2" onClick={() => onEditar(libro)}>Editar</button>
                <button className="btn btn-danger" onClick={() => onEliminar(libro.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
