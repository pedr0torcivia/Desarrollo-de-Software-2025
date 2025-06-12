import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Consulta from './Consulta';
import reservasServices from '../services/reservas.services';

export default function Registro() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  const [action, setAction] = React.useState("R");
  const [rows, setRows] = React.useState([]);
  const [postError, setPostError] = React.useState(null);

  const fechaHoy = new Date().toISOString().split("T")[0];
  const fechaIngreso = watch("FechaIngreso");

  const onSubmit = async (data) => {
    console.log("Datos enviados:", data);
    const response = await reservasServices.saveReserva(data);
    console.log("Respuesta del backend:", response);

    if (response.mensaje) {
      setPostError(response.mensaje);
      return;
    }
    setPostError("");
    setAction("C");
  };

  const loadData = async () => {
    try {
      const reservas = await reservasServices.getReservas();
      setRows(reservas);
    } catch (error) {
      console.error("Error al cargar reservas:", error);
    }
  };

  useEffect(() => {
    if (action !== "R") {
      loadData();
    }
  }, [action]);

  const onVolver = () => {
  navigate("/");
  setAction("R");
  console.log("Estado actual de acción:", action);}

  return (
    <div className="container_app">
      {action === "R" && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <h5>Registro de Reserva de estadía</h5>

          {/* DNI */}
          <div className="form-group">
            <label htmlFor="Dni">DNI reserva:</label>
            <input
              type="number"
              className="form-control"
              id="Dni"
              {...register("Dni", {
                required: {
                  value: true,
                  message: "Este campo es requerido"
                },
                minLength: {
                  value: 7,
                  message: "El DNI debe tener al menos 7 dígitos"
                },
                maxLength: {
                  value: 8,
                  message: "El DNI no puede tener más de 8 dígitos"
                },
                pattern: {
                  value: /^[0-9]+$/,
                  message: "El DNI solo puede contener números"
                }
              })}
            />
            {errors.Dni && <p className="error">{errors.Dni.message}</p>}
          </div>

          {/* Fecha de Ingreso */}
          <div className="form-group">
            <label htmlFor="FechaIngreso">Fecha de ingreso:</label>
            <input
              type="date"
              className="form-control"
              id="FechaIngreso"
              {...register("FechaIngreso", {
                required: "La fecha de ingreso es obligatoria"
              })}
              autoComplete="off"
            />
            {errors.FechaIngreso && (
              <p className="error">{errors.FechaIngreso.message}</p>
            )}
          </div>

          {/* Fecha de Salida */}
          <div className="form-group">
            <label htmlFor="FechaSalida">Fecha de salida:</label>
            <input
              type="date"
              className="form-control"
              id="FechaSalida"
              {...register("FechaSalida", {
                required: "La fecha de salida es obligatoria"
              })}
              autoComplete="off"
            />
            {errors.FechaSalida && (
              <p className="error">{errors.FechaSalida.message}</p>
            )}
          </div>

          {/* Tipo de Estadia */}
          <div className="form-group">
            <label htmlFor="TipoEstadia">Tipo de estadía:</label>
            <select
              className="form-control"
              id="TipoEstadia"
              {...register("TipoEstadia", {
                required: "El tipo de estadía es obligatorio"
              })}
            >
              <option value="">Seleccione...</option>
              <option value="Familiar">Familiar</option>
              <option value="Negocios">Negocios</option>
              <option value="Turismo">Turismo</option>
              <option value="Pareja">Pareja</option>
            </select>
            {errors.TipoEstadia && (
              <p className="error">{errors.TipoEstadia.message}</p>
            )}
          </div>

          {/* Cantidad de huéspedes */}
          <div className="form-group">
            <label htmlFor="Huespedes">Cantidad de huéspedes:</label>
            <input
              type="number"
              className="form-control"
              id="Huespedes"
              min="1"
              {...register("Huespedes", {
                required: "Este campo es obligatorio",
                min: {
                  value: 1,
                  message: "Debe haber al menos un huésped"
                }
              })}
            />
            {errors.Huespedes && (
              <p className="error">{errors.Huespedes.message}</p>
            )}
          </div>

          {postError && <p className="error">{postError}</p>}

          <div className="d-flex gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Registrar
            </button>

            <button type="button" className="btn btn-primary" onClick={onVolver}>
              Volver
            </button>
          </div>
        </form>
      )}

      {action !== "R" && rows.length > 0 && (
        <Consulta rows={rows} onVolver={onVolver} />
)}
    </div>
  );
}
