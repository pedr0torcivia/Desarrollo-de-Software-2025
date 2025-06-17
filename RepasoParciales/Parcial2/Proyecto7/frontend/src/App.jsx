import React, { useEffect, useState } from "react";
import TicketList from "./components/TicketList";
import TicketForm from "./components/TicketForm";
import { getAllTickets } from "./services/ticket.service";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [tickets, setTickets] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarTickets = async () => {
    try {
      setCargando(true);
      const data = await getAllTickets();
      setTickets(data);
    } catch (error) {
      console.error("Error al obtener tickets:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarTickets();
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Gestión de Tickets</h1>
      <TicketForm refrescar={cargarTickets} />
      <hr />
      <TicketList tickets={tickets} cargando={cargando} />
    </div>
  );
}

export default App;
