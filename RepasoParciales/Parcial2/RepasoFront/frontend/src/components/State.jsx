// src/components/State.jsx
import { useState } from 'react';

export default function State() {
  // Estado booleano: true (activo) / false (inactivo)
  const [activo, setActivo] = useState(false);

  // Cambia el estado al hacer clic
  const toggleActivo = () => {
    setActivo(!activo);
  };

  return (
    <div className="p-3 border rounded text-center">
      <button
        onClick={toggleActivo}
        className={`btn ${activo ? 'btn-success' : 'btn-danger'}`}
      >
        {activo ? 'Activo' : 'Inactivo'}
      </button>
    </div>
  );
}
