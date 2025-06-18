// frontend/src/components/PacientesTable.jsx
import React from "react";

export default function PacientesTable({ pacientes, onEdit, onDelete }) {
  if (!pacientes.length) {
    return <div className="alert alert-warning">No se encontraron pacientes.</div>;
  }

  return (
    <div className="table-responsive mt-3">
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Nombre Mascota</th>
            <th>Propietario</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pacientes.map((p) => (
            <tr key={p.IdPaciente}>
              <td>{p.IdPaciente}</td>
              <td>{p.NombreMascota}</td>
              <td>{p.Propietario}</td>
              <td>{p.Telefono || "-"}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => onEdit(p)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onDelete(p)}
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
