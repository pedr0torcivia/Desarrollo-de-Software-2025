import React from 'react';

export default function LibrosTable({ libros, onEdit, onDelete }) {
return (
  <div className="table-responsive">
    <table className="table table-bordered table-hover table-striped">
      <thead className="table-dark text-center">
        <tr>
          <th style={{ width: '80px' }}>ID</th>
          <th>Título</th>
          <th>Autor</th>
          <th>Año Publicación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {libros.map((libro) => (
          <tr key={libro.IdLibro}>
            <td className="text-center">{libro.IdLibro}</td>
            <td>{libro.Titulo}</td>
            <td>{libro.Autor}</td>
            <td className="text-center">{libro.AnioPublicacion}</td>
            <td className="text-center">
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(libro)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(libro.IdLibro)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

}
