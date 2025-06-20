import { useState, useEffect } from "react";
import Equipof1Buscar from "./Equipof1Buscar";
import Equipof1Listado from "./Equipof1Listado";
import Equipof1Registro from "./Equipof1Registro";
import { getAll } from "../services/equipof1.service";

const Equipof1 = () => {
  const [equipos, setEquipos] = useState([]);
  const [mostrarListado, setMostrarListado] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [mostrarRegistro, setMostrarRegistro] = useState(false);

  const cargarEquipos = async (nombre = "") => {
    try {
      const data = await getAll(nombre);
      setEquipos(data);
    } catch (error) {
      alert("Error al obtener los equipos");
      console.error(error);
    }
  };

  const handleBuscar = (nombre) => {
    setFiltro(nombre);
    cargarEquipos(nombre);
    setMostrarListado(true);
    setMostrarRegistro(false);
  };

  const handleAgregar = () => {
    setMostrarListado(false);
    setMostrarRegistro(true);
  };

  const handleCancelar = () => {
    setMostrarRegistro(false);
    setMostrarListado(true);
  };

  const handleGuardado = () => {
    cargarEquipos(filtro);
    setMostrarRegistro(false);
    setMostrarListado(true);
  };

  useEffect(() => {
    cargarEquipos();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Gestión de Equipos F1</h2>
      <Equipof1Buscar onBuscar={handleBuscar} onAgregar={handleAgregar} />
      {mostrarListado && <Equipof1Listado equipos={equipos} />}
      {mostrarRegistro && <Equipof1Registro onCancelar={handleCancelar} onGuardado={handleGuardado} />}
    </div>
  );
};

export default Equipof1;
