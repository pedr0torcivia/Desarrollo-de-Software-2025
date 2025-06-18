import React, { useEffect, useState } from 'react';
import * as servicio from './services/libros.service';
import LibroTabla from './components/LibroTabla';
import LibroFormulario from './components/LibroFormulario';
import Filtro from './components/Filtro';

export default function App() {
  const [libros, setLibros] = useState([]);
  const [modoFormulario, setModoFormulario] = useState(false);
  const [libroSeleccionado, setLibroSeleccionado] = useState(null);

  // Obtener todos los libros (con o sin búsqueda)
  const cargarLibros = async (busqueda = '') => {
    try {
      const res = await servicio.getAll(busqueda);
      setLibros(res.data);
    } catch (error) {
      console.error('Error al obtener libros:', error);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  // Guardar alta o modificación
  const handleGuardar = async (libro) => {
    try {
      if (libro.id) {
        await servicio.update(libro.id, libro);
      } else {
        await servicio.create(libro);
      }
      setModoFormulario(false);
      setLibroSeleccionado(null);
      cargarLibros(); // recarga la lista actualizada
    } catch (error) {
      console.error('Error al guardar libro:', error);
    }
  };

  // Eliminar libro
  const handleEliminar = async (id) => {
    if (window.confirm("¿Eliminar este libro?")) {
      try {
        await servicio.remove(id);
        cargarLibros();
      } catch (error) {
        console.error('Error al eliminar libro:', error);
      }
    }
  };

  // Cargar en formulario para editar
  const handleEditar = (libro) => {
    setLibroSeleccionado(libro);
    setModoFormulario(true);
  };

  // Buscar libros desde el backend
  const buscarLibros = async (texto) => {
    cargarLibros(texto);
  };

  return (
    <div className="container">
      <h1 className="mt-4">Gestión de Libros</h1>
      {!modoFormulario && (
        <>
          <button className="btn btn-primary mb-3" onClick={() => setModoFormulario(true)}>
            Nuevo Libro
          </button>
          <Filtro onFiltrar={buscarLibros} />
          <LibroTabla libros={libros} onEditar={handleEditar} onEliminar={handleEliminar} />
        </>
      )}
      {modoFormulario && (
        <LibroFormulario
          libroSeleccionado={libroSeleccionado}
          onGuardar={handleGuardar}
          onCancelar={() => {
            setModoFormulario(false);
            setLibroSeleccionado(null);
          }}
        />
      )}
    </div>
  );
}
