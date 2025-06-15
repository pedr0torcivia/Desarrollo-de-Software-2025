import { useState, useEffect } from "react";
import * as service from "./services/producto.service";
import Tabla from "./components/Tabla";
import Formulario from "./components/Formulario";
import Filtro from "./components/Filtro";

function App() {
  const [datos, setDatos] = useState([]);
  const [accion, setAccion] = useState("L");
  const [filtro, setFiltro] = useState("");
  const [productoActual, setProductoActual] = useState(null);

  const cargarDatos = () => {
    service.getAll(filtro).then((res) => setDatos(res.data));
  };

  useEffect(() => { cargarDatos(); }, []);

  const guardarProducto = async (data) => {
    if (productoActual) await service.update(productoActual.id, data);
    else await service.create(data);
    setAccion("L");
    cargarDatos();
  };

  const eliminarProducto = async (id) => {
    if (window.confirm("¿Seguro de eliminar?")) {
      await service.remove(id);
      cargarDatos();
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-primary">Gestión de Productos</h1>

      {accion === "L" && (
        <>
          <Filtro filtro={filtro} setFiltro={setFiltro} onBuscar={cargarDatos} />
          <button className="btn btn-primary mb-3" onClick={() => { setAccion("A"); setProductoActual(null); }}>
            ➕ Nuevo Producto
          </button>
          <Tabla datos={datos} onEditar={(p) => { setProductoActual(p); setAccion("M"); }} onEliminar={eliminarProducto} />
        </>
      )}

      {(accion === "A" || accion === "M") && (
        <Formulario
          producto={productoActual}
          onGuardar={guardarProducto}
          onCancelar={() => setAccion("L")}
        />
      )}
    </div>
  );
}

export default App;
