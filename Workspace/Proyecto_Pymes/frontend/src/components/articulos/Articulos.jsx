import React, { useState, useEffect } from "react";
import moment from "moment";
import ArticulosBuscar from "./ArticulosBuscar";
import ArticulosListado from "./ArticulosListado";
import ArticulosRegistro from "./ArticulosRegistro";
import { articulosFamiliasMockService as articulosFamiliasService } from "../../services/articulosFamilias-mock.service";

function Articulos() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };

  const [AccionABMC, setAccionABMC] = useState("L");
  const [Nombre, setNombre] = useState("");
  const [Activo, setActivo] = useState("");
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null);
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);
  const [ArticulosFamilias, setArticulosFamilias] = useState(null);

  useEffect(() => {
    async function BuscarArticulosFamilas() {
      let data = await articulosFamiliasService.Buscar();
      setArticulosFamilias(data);
    }
    BuscarArticulosFamilas();
  }, []);

  function Buscar(pagina) {
    // Por ahora simulado
    const data = [
      {
        IdArticulo: 1,
        Nombre: "Notebook",
        Precio: 500000,
        Stock: 10,
        FechaAlta: moment().toDate(),
        Activo: true,
      },
    ];
    setItems(data);
  }

  function Agregar() {
    setAccionABMC("A");
  }

  function Consultar(item) {
    setItem(item);
    setAccionABMC("C");
  }

  function Modificar(item) {
    setItem(item);
    setAccionABMC("M");
  }

  function ActivarDesactivar(item) {
    alert("Activando/Desactivando...");
  }

  async function Grabar(item) {
    alert(
      "Registro " +
        (AccionABMC === "A" ? "agregado" : "modificado") +
        " correctamente."
    );
    Volver();
  }

  function Volver() {
    setAccionABMC("L");
  }

  return (
    <div>
      <div className="tituloPagina">
        Articulos <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {AccionABMC === "L" && (
        <ArticulosBuscar
          Nombre={Nombre}
          setNombre={setNombre}
          Activo={Activo}
          setActivo={setActivo}
          Buscar={Buscar}
          Agregar={Agregar}
        />
      )}

      {AccionABMC === "L" && Items?.length > 0 && (
        <ArticulosListado
          {...{
            Items,
            Consultar,
            Modificar,
            ActivarDesactivar,
            Imprimir: () => {},
            Pagina,
            RegistrosTotal,
            Paginas,
            Buscar,
          }}
        />
      )}

      {AccionABMC === "L" && Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {AccionABMC !== "L" && (
        <ArticulosRegistro
          {...{ AccionABMC, ArticulosFamilias, Item, Grabar, Volver }}
        />
      )}
    </div>
  );
}

export { Articulos };
