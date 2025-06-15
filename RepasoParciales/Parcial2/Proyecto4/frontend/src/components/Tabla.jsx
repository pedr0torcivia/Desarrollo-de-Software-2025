export default function Tabla({ datos, onEditar, onEliminar }) {
  if (!datos.length)
    return <div className="alert alert-warning">No hay productos para mostrar</div>;

  return (
    <table className="table table-bordered table-striped table-hover">
      <thead className="table-dark text-center">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Fecha Alta</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {datos.map((prod) => (
          <tr key={prod.id}>
            <td>{prod.id}</td>
            <td>{prod.nombre}</td>
            <td>${prod.precio.toFixed(2)}</td>
            <td>{prod.stock}</td>
            <td>{new Date(prod.fechaAlta).toLocaleDateString()}</td>
            <td>
              <button className="btn btn-warning btn-sm me-2" onClick={() => onEditar(prod)}>✏️</button>
              <button className="btn btn-danger btn-sm" onClick={() => onEliminar(prod.id)}>🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
