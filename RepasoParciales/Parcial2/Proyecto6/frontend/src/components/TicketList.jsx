// frontend/src/components/TicketList.jsx
import React from 'react';

export default function TicketList({ tickets, loading }) {
  if (loading)
    return <div className="alert alert-info text-center mt-4">Cargando tickets...</div>;

  if (tickets.length === 0)
    return <div className="alert alert-warning text-center mt-4">No se encontraron tickets</div>;

  return (
    <div className="table-responsive mt-4">
      <h5 className="mb-3 text-secondary">
        <i className="bi bi-list-check me-2"></i>Listado de Tickets
      </h5>
      <table className="table table-hover table-bordered align-middle shadow-sm">
        <thead className="table-dark text-center">
          <tr>
            <th style={{ width: '5%' }}>#</th>
            <th style={{ width: '45%' }}>Nombre de Tarea</th>
            <th style={{ width: '25%' }}>Fecha</th>
            <th style={{ width: '25%' }}>Prioridad</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.idTicket}>
              <td className="text-center fw-bold">{ticket.idTicket}</td>
              <td>{ticket.nombreTarea}</td>
              <td className="text-center">{ticket.fecha}</td>
              <td className="text-center">
                <span className="badge bg-primary fs-6">{ticket.prioridad}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
