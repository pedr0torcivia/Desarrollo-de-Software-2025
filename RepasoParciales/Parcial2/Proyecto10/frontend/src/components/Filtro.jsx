// frontend/src/App.jsx
import { useEffect, useState } from "react";
import { getAll, create, update, remove } from "./services/pacientes.service";
import PacientesTable from "./components/PacientesTable";
import PacienteForm from "./components/PacienteForm";
import Filtro from "./components/Filtro";

function App() {
  const [pacientes, setPacientes] = useState([]);
  const [accion, setAccion] = useState("L"); // L: listar, A: agregar, M: modificar
  const [pacienteActual, setPacienteActual] = useState(null);
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    cargarPacientes();
  }, []);

  const cargarPacientes = async (filtroTexto = "") => {
    try {
      const { data } = await getAll(filtroTexto);
      setPacientes(data);
    } catch (error) {
      alert("Error al cargar pacientes");
    }
  };

  const handleAgregar = () => {
    setPacienteActual(null);
    setAccion("A");
  };

  const handleEditar = (paciente) => {
    setPacienteActual(paciente);
    setAccion("M");
  };

  const handleEliminar = async (paciente) => {
    if (!window.confirm("¿Eliminar paciente?")) return;
    try {
      await remove(paciente.IdPaciente);
      await cargarPacientes();
    } catch (error) {
      alert("Error al eliminar");
    }
  };

  const handleGuardar = async (datos) => {
    try {
      if (accion === "A") {
        await create(datos);
      } else {
        await update(pacienteActual.IdPaciente, datos);
      }
      await cargarPacientes();
      setAccion("L");
    } catch (error) {
      alert("Error al guardar");
    }
  };

  const handleCancelar = () => {
    setAccion("L");
    setPacienteActual(null);
  };

  const handleBuscar = async () => {
    await cargarPacientes(filtro);
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Gestión de Pacientes</h1>

      {accion === "L" && (
        <>
          <Filtro
            filtro={filtro}
            setFiltro={setFiltro}
            onBuscar={handleBuscar}
            onAgregar={handleAgregar}
          />
          <PacientesTable
            pacientes={pacientes}
            onEdit={handleEditar}
            onDelete={handleEliminar}
          />
        </>
      )}

      {accion !== "L" && (
        <PacienteForm
          inicial={pacienteActual}
          onGuardar={handleGuardar}
          onCancelar={handleCancelar}
        />
      )}
    </div>
  );
}

export default App;
