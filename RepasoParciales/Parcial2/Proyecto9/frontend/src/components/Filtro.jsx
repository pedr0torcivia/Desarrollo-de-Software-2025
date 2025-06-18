// src/components/Filtro.jsx
import React, { useState } from 'react';

export default function Filtro({ onFiltrar }) {
  const [texto, setTexto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFiltrar(texto); // envía el texto al componente padre
  };

  return (
    <form className="container mt-3 mb-3" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por título o autor..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Buscar
        </button>
      </div>
    </form>
  );
}
