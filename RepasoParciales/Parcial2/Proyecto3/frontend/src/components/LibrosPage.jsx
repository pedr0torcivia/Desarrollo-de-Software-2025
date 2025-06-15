import React, { useEffect, useState } from 'react';
import { obtenerLibros } from '../services/librosService';
import LibrosTable from './LibrosTable';
import LibroForm from './LibroForm';
import axios from 'axios';

export default function LibrosPage() {
  const [libros, setLibros] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [libroEditando, setLibroEditando] = useState(null);

  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async (termino = '') => {
    try {
      const data = await obtenerLibros(termino);
      setLibros(data);
      setMensaje(data.length === 0 ? 'No se encontraron libros.' : '');
    } catch (error) {
      console.error('Error al cargar libros:', error);
      setMensaje('Error al cargar los libros.');
    }
  };

  const manejarBusqueda = (e) => {
    e.preventDefault();
    cargarLibros(busqueda.trim());
  };

  const onEdit = (libro) => {
    setLibroEditando(libro);
    setMostrarFormulario(true);
  };

  const onDelete = async (id) => {
    if (!window.confirm('¿Estás seguro que querés eliminar este libro?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/libros/${id}`);
      cargarLibros();
    } catch (error) {
      console.error('Error al eliminar libro:', error);
      alert('No se pudo eliminar el libro.');
    }
  };

  const onSave = () => {
    setMostrarFormulario(false);
    setLibroEditando(null);
    cargarLibros();
  };

  const onCancel = () => {
    setMostrarFormulario(false);
    setLibroEditando(null);
  };

return (
  <div className="container mt-5">
    <h1 className="mb-4 text-center">Gestión de Libros con React</h1>

    {/* Formulario de búsqueda */}
    <form className="row justify-content-center mb-3" onSubmit={manejarBusqueda}>
      <div className="col-md-6 mb-2 mb-md-0">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="Buscar por título..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <div className="col-md-2">
        <button type="submit" className="btn btn-primary w-100">Buscar</button>
      </div>
    </form>

    {/* Botón agregar */}
    <div className="text-center mb-3">
      <button
        type="button"
        className="btn btn-success"
        onClick={() => {
          setMostrarFormulario(true);
          setLibroEditando(null);
        }}
      >
        Agregar Nuevo Libro
      </button>
    </div>

    {/* Formulario ABM */}
    {mostrarFormulario && (
      <LibroForm
        onSave={onSave}
        onCancel={onCancel}
        bookToEdit={libroEditando}
      />
    )}

    {/* Tabla o mensaje */}
    {mensaje && <div className="alert alert-warning text-center">{mensaje}</div>}
    {!mensaje && (
      <LibrosTable libros={libros} onEdit={onEdit} onDelete={onDelete} />
    )}
  </div>
);

}
