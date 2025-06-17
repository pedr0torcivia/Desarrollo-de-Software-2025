import React from "react";

export default function TicketList({ tickets, cargando }) {
  if (cargando) {
    return <p>Cargando tickets...</p>;
  }

  if (!Array.isArray(tickets)) {
    return <p>Error: los datos de tickets no son válidos.</p>;
  }

  if (tickets.length === 0) {
    return <p>No se encontraron tickets.</p>;
  }

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre de la Tarea</th>
          <th>Fecha</th>
          <th>Prioridad</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map(ticket => (
          <tr key={ticket.idTicket}>
            <td>{ticket.idTicket}</td>
            <td>{ticket.nombreTarea}</td>
            <td>{ticket.fecha}</td>
            <td>{ticket.prioridad}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
