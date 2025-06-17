import { useEffect, useState } from "react";
import Filtro from "./Filtro";
import TablaJuegos from "./TablaJuegos";
import juegoService from "../services/juegos.service.js";

export default function ListadoJuegos() {
  const [juegos, setJuegos] = useState([]);
  const [filtro, setFiltro] = useState({ texto: "", idPlataforma: "", codigoEsrb: "" });
  const [cantidadFiltrada, setCantidadFiltrada] = useState(0);
  const [cantidadTotal, setCantidadTotal] = useState(0);

  useEffect(() => {
    // Cargar el total de juegos una sola vez al inicio
    juegoService.contar({}).then(({ cantidad }) => setCantidadTotal(cantidad));
  }, []);

  const aplicarFiltros = async () => {
    try {
      const lista = await juegoService.buscarFiltrado(filtro);
      const { cantidad } = await juegoService.contar(filtro);
      setJuegos(lista);
      setCantidadFiltrada(cantidad);
    } catch (err) {
      console.error("Error al obtener juegos:", err);
    }
  };

  const limpiarFiltros = () => {
    const limpio = { texto: "", idPlataforma: "", codigoEsrb: "" };
    setFiltro(limpio);
    aplicarFiltros(); // Opcional: ejecutar búsqueda limpia
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">🎮 Listado de Juegos</h2>
      <Filtro
        filtro={filtro}
        setFiltro={setFiltro}
        onLimpiar={limpiarFiltros}
        onBuscar={aplicarFiltros}
      />
      <TablaJuegos juegos={juegos} />
      <div className="mt-3">
        Mostrando <strong>{cantidadFiltrada}</strong> de <strong>{cantidadTotal}</strong> juegos.
      </div>
    </div>
  );
}
