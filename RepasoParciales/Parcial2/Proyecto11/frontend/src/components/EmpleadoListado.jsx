import React from "react";

export default function EmpleadoListado({ empleados, onModificar, onEliminar }) {
  if (!Array.isArray(empleados) || empleados.length === 0) {
    return <p className="alert alert-info">No se encontraron empleados.</p>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Apellido y Nombre</th>
            <th>DNI</th>
            <th>Fecha de Nacimiento</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.IdEmpleado}>
              <td>{emp.IdEmpleado}</td>
              <td>{emp.ApellidoYNombre}</td>
              <td>{emp.Dni}</td>
              <td>{emp.FechaNacimiento?.substring(0, 10)}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => onModificar(emp.IdEmpleado)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => onEliminar(emp.IdEmpleado)}
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
