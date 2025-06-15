import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function LibroForm({ onSave, onCancel, bookToEdit }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [anio, setAnio] = useState('');

  useEffect(() => {
    if (bookToEdit) {
      setTitulo(bookToEdit.Titulo);
      setAutor(bookToEdit.Autor);
      setAnio(bookToEdit.AnioPublicacion);
    } else {
      setTitulo('');
      setAutor('');
      setAnio('');
    }
  }, [bookToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = {
      Titulo: titulo,
      Autor: autor,
      AnioPublicacion: parseInt(anio),
    };

    try {
      if (bookToEdit) {
        await axios.put(`http://localhost:3000/api/libros/${bookToEdit.IdLibro}`, datos);
      } else {
        await axios.post('http://localhost:3000/api/libros', datos);
      }
      onSave();
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('No se pudo guardar el libro.');
    }
  };

return (
  <form onSubmit={handleSubmit} className="border p-4 bg-light rounded mb-4">
    <h4 className="mb-3">{bookToEdit ? 'Modificar Libro' : 'Nuevo Libro'}</h4>

    <div className="mb-3">
      <label className="form-label">Título</label>
      <input
        type="text"
        className="form-control"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Autor</label>
      <input
        type="text"
        className="form-control"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        required
      />
    </div>

    <div className="mb-3">
      <label className="form-label">Año de Publicación</label>
      <input
        type="number"
        className="form-control"
        value={anio}
        onChange={(e) => setAnio(e.target.value)}
        required
      />
    </div>

    <div className="d-flex gap-2">
      <button type="submit" className="btn btn-success">
        Guardar
      </button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>
        Cancelar
      </button>
    </div>
  </form>
);

}
