const formatearFecha = (fechaStr) => {
  if (!fechaStr) return "";
  const fecha = new Date(fechaStr);
  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0");
  const anio = fecha.getFullYear();
  return `${dia}/${mes}/${anio}`;
};

const formatearMoneda = (valor) => {
  if (valor == null) return "";
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(valor);
};

const Equipof1Listado = ({ equipos }) => {
  if (!equipos.length) {
    return (
      <div className="alert alert-info mt-4">
        No se encontraron equipos.
      </div>
    );
  }

  return (
    <table className="table table-striped mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre del Equipo</th>
          <th>Nombre del Corredor</th>
          <th>Fecha de Fundación</th>
          <th>Campeonatos Ganados</th>
          <th>Presupuesto</th>
        </tr>
      </thead>
      <tbody>
        {equipos.map((e) => (
          <tr key={e.IdEquipo}>
            <td>{e.IdEquipo}</td>
            <td>{e.NombreEquipo}</td>
            <td>{e.NombreCorredor}</td>
            <td>{formatearFecha(e.FechaDeInicio)}</td>
            <td>{e.CampeonatosGanados}</td>
            <td>{formatearMoneda(e.Presupuesto)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Equipof1Listado;
