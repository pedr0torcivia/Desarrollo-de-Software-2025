// src/components/Effect_State.jsx
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Effect_State() {
  const [contador, setContador] = useState(0); // Estado del contador

  // Este efecto se ejecuta cada vez que cambia el contador
  useEffect(() => {
    console.log(`Contador actualizado: ${contador}`);
  }, [contador]); // Dependencia: contador

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Contador React con useState y useEffect</h2>

      <div className="display-4 mb-3 text-primary">
        {contador}
      </div>

      <div className="btn-group">
        <button className="btn btn-success" onClick={() => setContador(contador + 1)}>
          Incrementar
        </button>
        <button className="btn btn-danger" onClick={() => setContador(contador - 1)}>
          Decrementar
        </button>
        <button className="btn btn-secondary" onClick={() => setContador(0)}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}
