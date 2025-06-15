export default function Filtro({ filtro, setFiltro, onBuscar }) {
  return (
    <div className="mb-3 row">
      <label className="col-sm-2 col-form-label">Buscar</label>
      <div className="col-sm-6">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del producto"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>
      <div className="col-sm-2">
        <button className="btn btn-primary" onClick={onBuscar}>Buscar</button>
      </div>
    </div>
  );
}
