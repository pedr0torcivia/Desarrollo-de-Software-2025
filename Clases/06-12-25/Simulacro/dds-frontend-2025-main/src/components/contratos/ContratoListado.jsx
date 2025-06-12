import React from "react";

export default function ContratoListado({ contratos }) {
  const formatearFecha = (fechaIso) => {
    const f = new Date(fechaIso);
    return f.toLocaleDateString("es-AR");
  };

  const formatearMoneda = (importe) => {
    return Number(importe).toLocaleString("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    });
  };

  if (!contratos.length)
    return <div className="alert alert-warning">No hay contratos encontrados.</div>;

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre del Contrato</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Importe Mensual</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {contratos.map((c) => (
            <tr key={c.IdContrato}>
              <td>{c.IdContrato}</td>
              <td>{c.NombreContrato}</td>
              <td>{formatearFecha(c.FechaInicio)}</td>
              <td>{formatearFecha(c.FechaFin)}</td>
              <td>{formatearMoneda(c.ImporteMensual)}</td>
              <td>{c.TelefonoContacto}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
