import { useState, useEffect } from 'react';
import DeudoresListado from './DeudoresListado';
import RegistroDeudores from './RegistroDeudores';
import { deudoresService } from '../services/deudores.service';

export default function Deudores() {
  const [modo, setModo] = useState('L'); // 'L' = listado, 'A' = alta
  const [lista, setLista] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const datos = await deudoresService.getAll();
      setLista(datos);
    } catch (error) {
      alert("Error al cargar deudores");
    }
  };

  const volverAlListado = () => {
    setModo('L');
    cargarDatos();
  };

  return (
    <div className="container mt-4">
      {modo === 'L' && (
        <DeudoresListado lista={lista} onAgregar={() => setModo('A')} />
      )}
      {modo === 'A' && (
        <RegistroDeudores onVolver={volverAlListado} />
      )}
    </div>
  );
}
