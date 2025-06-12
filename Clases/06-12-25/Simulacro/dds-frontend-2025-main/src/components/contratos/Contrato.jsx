import React, { useState } from "react";
import ContratoListado from "./ContratoListado";
import ContratoRegistro from "./ContratoRegistro";
import contratosService from "../../services/contratos.service";

export default function Contrato() {
  const [contratos, setContratos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [accion, setAccion] = useState("L"); // L = Listado, A = Alta

  const buscar = async () => {
    try {
      const data = await contratosService.getByNombre(filtro);
      setContratos(data);
      setAccion("L");
    } catch (error) {
      alert("Error al buscar contratos");
    }
  };

  const agregar = () => {
    setAccion("A");
  };

  const volver = () => {
    setAccion("L");
    buscar();
  };

  return (
    <div className="container mt-4">
      <h2>Gestión de Contratos</h2>
      {accion === "L" && (
        <>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre del contrato"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            />
            <button className="btn btn-primary" onClick={buscar}>
              Buscar
            </button>
            <button className="btn btn-success ms-2" onClick={agregar}>
              Agregar
            </button>
          </div>
          <ContratoListado contratos={contratos} />
        </>
      )}
      {accion === "A" && (
        <ContratoRegistro onVolver={volver} />
      )}
    </div>
  );
}
