// frontend/src/App.jsx
import React, { useEffect, useState } from 'react';
import { getTickets } from './services/ticket.service';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';

function App() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarTickets = () => {
    setLoading(true);
    getTickets()
      .then((res) => {
        setTickets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al cargar tickets", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    cargarTickets();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 border-0 rounded-4">
        <h1 className="text-center mb-4">
          <i className="bi bi-clipboard2-check-fill me-2"></i>
          Sistema de Gestión de Tickets
        </h1>

        <div className="row">
          <div className="col-md-6 offset-md-3">
            <TicketForm onTicketCreado={cargarTickets} />
          </div>
        </div>

        <hr className="my-4" />

        <TicketList tickets={tickets} loading={loading} />
      </div>
    </div>
  );
}

export default App;
