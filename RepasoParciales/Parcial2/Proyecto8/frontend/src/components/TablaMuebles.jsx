// frontend/src/components/TablaMuebles.jsx
export default function TablaMuebles({ muebles, onEditar, onEliminar }) {
  if (!muebles.length) return <p>No se encontraron muebles.</p>;

  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Material</th>
          <th>Fecha Fabricación</th>
          <th>Precio Estimado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {muebles.map((m) => (
          <tr key={m.IdMueble}>
            <td>{m.IdMueble}</td>
            <td>{m.Nombre}</td>
            <td>{m.Material}</td>
            <td>{new Date(m.FechaFabricacion).toLocaleDateString('es-AR')}</td>
            <td>${parseFloat(m.PrecioEstimado).toFixed(2)}</td>
            <td>
              <button className="btn btn-sm btn-warning me-2" onClick={() => onEditar(m)}>Editar</button>
              <button className="btn btn-sm btn-danger" onClick={() => onEliminar(m.IdMueble)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
