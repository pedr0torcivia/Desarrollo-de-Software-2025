// frontend/src/App.jsx
import { useState, useEffect } from 'react';
import { getAll, getByNombre, update, remove } from './services/muebles.service';
import TablaMuebles from './components/TablaMuebles';
import Filtro from './components/Filtro';
import FormularioMueble from './components/FormularioMueble';

function App() {
  const [muebles, setMuebles] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [editando, setEditando] = useState(null);

  const cargarMuebles = async () => {
    try {
      const resp = busqueda
        ? await getByNombre(busqueda)
        : await getAll();
      setMuebles(resp.data);
    } catch (error) {
      console.error("Error al cargar muebles", error);
      setMuebles([]);
    }
  };

  useEffect(() => {
    cargarMuebles();
  }, []);

  const handleBuscar = () => {
    cargarMuebles();
  };

  const handleEditar = (mueble) => {
    setEditando(mueble);
  };

  const handleGuardar = async (datos) => {
    try {
      if (datos.IdMueble) {
        await update(datos.IdMueble, datos);
        setEditando(null);
        cargarMuebles();
      }
    } catch (error) {
      console.error("Error al guardar", error);
    }
  };

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro que querés eliminar este mueble?")) {
      try {
        await remove(id);
        cargarMuebles();
      } catch (error) {
        console.error("Error al eliminar", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h1>Gestión de Muebles</h1>

      <Filtro
        valor={busqueda}
        onCambio={setBusqueda}
        onBuscar={handleBuscar}
      />

      {editando && (
        <FormularioMueble
          datosIniciales={editando}
          onGuardar={handleGuardar}
          onCancelar={() => setEditando(null)}
        />
      )}

      <TablaMuebles
        muebles={muebles}
        onEditar={handleEditar}
        onEliminar={handleEliminar}
      />
    </div>
  );
}

export default App;
