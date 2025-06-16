export default function DeudoresListado({ lista, onAgregar }) {
  return (
    <div>
      <h3>Listado de Deudores</h3>
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-dark text-center">
          <tr>
            <th>Apellido y Nombre</th>
            <th>Fecha de Deuda</th>
            <th>Fecha Límite</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {lista.map((deudor, index) => (
            <tr key={index}>
              <td>{deudor.nombreCompleto}</td>
              <td>{deudor.fechaDeuda}</td>
              <td>{deudor.fechaLimitePago}</td>
              <td>${deudor.importe.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-end">
        <button className="btn btn-primary" onClick={onAgregar}>
          Agregar
        </button>
      </div>
    </div>
  );
}
