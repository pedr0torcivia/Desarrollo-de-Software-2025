// frontend/src/components/Filtro.jsx
export default function Filtro({ valor, onCambio, onBuscar }) {
  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar por nombre"
        value={valor}
        onChange={(e) => onCambio(e.target.value)}
      />
      <button className="btn btn-primary" onClick={onBuscar}>
        Buscar
      </button>
    </div>
  );
}
