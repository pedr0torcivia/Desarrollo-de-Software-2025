import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getAll, getById, create, update, remove } from "../services/empleados.service";
import EmpleadoListado from "./EmpleadoListado";
import EmpleadoRegistro from "./EmpleadoRegistro";

export default function Empleado() {
  const [empleados, setEmpleados] = useState([]);
  const [accion, setAccion] = useState("C");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
  const [pagina, setPagina] = useState(1);
  const [registrosTotal, setRegistrosTotal] = useState(0);
  const { register, handleSubmit, reset, watch } = useForm();

  const TAM_PAGINA = 10;

  const buscar = async (data) => {
    try {
      const filtro = data?.ApellidoYNombre?.trim() || "";
      const resultados = await getAll(filtro, pagina);
      setEmpleados(resultados?.Items || []);
      setRegistrosTotal(resultados?.RegistrosTotal || 0);
    } catch (error) {
      console.error("Error al buscar empleados", error);
      alert("Error al buscar empleados");
    }
  };

  const volver = () => {
    setAccion("C");
    setEmpleadoSeleccionado(null);
    buscar({ ApellidoYNombre: watch("ApellidoYNombre") });
  };

  const iniciarAlta = () => {
    setAccion("A");
    setEmpleadoSeleccionado(null);
  };

  const iniciarModificacion = async (id) => {
    try {
      const emp = await getById(id);
      setEmpleadoSeleccionado(emp);
      setAccion("M");
    } catch (error) {
      alert("No se pudo cargar este empleado");
    }
  };

  const eliminarEmpleado = async (id) => {
    if (window.confirm("¿Está seguro que desea eliminar este empleado?")) {
      try {
        await remove(id);
        volver();
      } catch (error) {
        alert("Error al eliminar");
      }
    }
  };

  const guardarEmpleado = async (data) => {
    try {
      if (accion === "A") {
        await create(data);
      } else if (accion === "M") {
        await update(data.IdEmpleado, data);
      }
      volver();
    } catch (error) {
      alert("Error al guardar");
    }
  };

  useEffect(() => {
    buscar({ ApellidoYNombre: "" });
  }, [pagina]);

  const totalPaginas = Math.ceil(registrosTotal / TAM_PAGINA);

  return (
    <div className="container mt-4">
      {accion === "C" && (
        <>
          <h2>Consulta de Empleados</h2>
          <form className="row g-3 mb-3" onSubmit={handleSubmit(buscar)}>
            <div className="col-md-6">
              <input
                {...register("ApellidoYNombre")}
                className="form-control"
                placeholder="Buscar por Apellido y Nombre"
              />
            </div>
            <div className="col-md-2">
              <button type="submit" className="btn btn-primary">Buscar</button>
            </div>
            <div className="col-md-4 text-end">
              <button type="button" className="btn btn-success" onClick={iniciarAlta}>
                Nuevo Empleado
              </button>
            </div>
          </form>

          <EmpleadoListado
            empleados={empleados}
            onModificar={iniciarModificacion}
            onEliminar={eliminarEmpleado}
          />

          {/* Paginación */}
          {totalPaginas > 1 && (
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-outline-secondary me-2"
                disabled={pagina === 1}
                onClick={() => setPagina(pagina - 1)}
              >
                ◀ 
              </button>
              <span className="align-self-center">Página {pagina} de {totalPaginas}</span>
              <button
                className="btn btn-outline-secondary ms-2"
                disabled={pagina === totalPaginas}
                onClick={() => setPagina(pagina + 1)}
              >
                ▶
              </button>
            </div>
          )}
        </>
      )}
      {(accion === "A" || accion === "M") && (
        <EmpleadoRegistro
          datosIniciales={empleadoSeleccionado}
          onVolver={volver}
          onGuardar={guardarEmpleado}
        />
      )}
    </div>
  );
}
