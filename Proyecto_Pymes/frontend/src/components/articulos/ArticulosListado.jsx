import React from "react";
import moment from "moment";

export default function ArticulosListado({
  Items,
  Consultar,
  Modificar,
  ActivarDesactivar,
  Imprimir,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Nombre</th>
            <th className="text-center">Precio</th>
            <th className="text-center">Stock</th>
            <th className="text-center">Fecha de Alta</th>
            <th className="text-center">Activo</th>
            <th className="text-center text-nowrap">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Items &&
            Items.map((Item) => (
              <tr key={Item.IdArticulo}>
                <td>{Item.Nombre}</td>
                <td className="text-end">{Item.Precio}</td>
                <td className="text-end">{Item.Stock}</td>
                <td className="text-end">{moment(Item.FechaAlta).format("DD/MM/YYYY")}</td>
                <td>{Item.Activo ? "SI" : "NO"}</td>
                <td className="text-center text-nowrap">
                  <button className="btn btn-sm btn-outline-primary" title="Consultar" onClick={() => Consultar(Item)}>
                    <i className="fa fa-eye"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-primary" title="Modificar" onClick={() => Modificar(Item)}>
                    <i className="fa fa-edit"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger" title="Activar/Desactivar" onClick={() => ActivarDesactivar(Item)}>
                    <i className="fa fa-toggle-on"></i>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
