import { useForm } from "react-hook-form";
import { create } from "../services/equipof1.service";

const Equipof1Registro = ({ onCancelar, onGuardado }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await create(data);
      onGuardado();
      reset();
    } catch (error) {
      console.error("Error completo:", error.response?.data || error.message);
      alert("Error al guardar el equipo");
    }
  };

  return (
    <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Nombre del Equipo</label>
          <input
            className={`form-control ${errors.NombreEquipo ? "is-invalid" : ""}`}
            {...register("NombreEquipo", { required: true })}
          />
          {errors.NombreEquipo && <div className="invalid-feedback">Este campo es requerido</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Nombre del Corredor</label>
          <input
            className={`form-control ${errors.NombreCorredor ? "is-invalid" : ""}`}
            {...register("NombreCorredor", {
              required: true,
              minLength: 7,
              maxLength: 50,
            })}
          />
          {errors.NombreCorredor && (
            <div className="invalid-feedback">Debe tener entre 7 y 50 caracteres</div>
          )}
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Fecha de Fundación</label>
          <input
            type="date"
            className={`form-control ${errors.FechaDeInicio ? "is-invalid" : ""}`}
            {...register("FechaDeInicio", { required: true })}
          />
          {errors.FechaDeInicio && <div className="invalid-feedback">Este campo es requerido</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Campeonatos Ganados</label>
          <input
            type="number"
            className={`form-control ${errors.CampeonatosGanados ? "is-invalid" : ""}`}
            {...register("CampeonatosGanados", { required: true })}
          />
          {errors.CampeonatosGanados && <div className="invalid-feedback">Este campo es requerido</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Presupuesto Anual</label>
          <input
            type="number"
            step="0.01"
            className={`form-control ${errors.Presupuesto ? "is-invalid" : ""}`}
            {...register("Presupuesto", { required: true })}
          />
          {errors.Presupuesto && <div className="invalid-feedback">Este campo es requerido</div>}
        </div>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
};

export default Equipof1Registro;
