import React from "react";
import { useForm } from "react-hook-form";

export default function ArticulosRegistro({
  AccionABMC,
  ArticulosFamilias,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ values: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  if (!Item) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>
          {/* Nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Nombre">
                Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("Nombre", {
                  required: { value: true, message: "Nombre es requerido" },
                  minLength: {
                    value: 4,
                    message: "Nombre debe tener al menos 4 caracteres",
                  },
                  maxLength: {
                    value: 55,
                    message: "Nombre debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.Nombre ? "is-invalid" : "")
                }
              />
              {errors?.Nombre && touchedFields.Nombre && (
                <div className="invalid-feedback">
                  {errors?.Nombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* Precio */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Precio">
                Precio<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                step=".01"
                {...register("Precio", {
                  required: { value: true, message: "Precio es requerido" },
                  min: { value: 1, message: "Precio debe ser mayor a cero" },
                  max: {
                    value: 999999,
                    message: "Precio debe ser menor a 999999",
                  },
                })}
                className={
                  "form-control " + (errors?.Precio ? "is-invalid" : "")
                }
              />
              {errors?.Precio && touchedFields.Precio && (
                <div className="invalid-feedback">
                  {errors?.Precio?.message}
                </div>
              )}
            </div>
          </div>

          {/* Stock */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Stock">
                Stock<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number"
                {...register("Stock", {
                  required: { value: true, message: "Stock es requerido" },
                  min: { value: 0, message: "Stock debe ser mayor o igual a cero" },
                  max: {
                    value: 9999,
                    message: "Stock debe ser menor a 9999",
                  },
                })}
                className={
                  "form-control " + (errors?.Stock ? "is-invalid" : "")
                }
              />
              {errors?.Stock && touchedFields.Stock && (
                <div className="invalid-feedback">
                  {errors?.Stock?.message}
                </div>
              )}
            </div>
          </div>

          {/* Código de Barra */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="CodigoDeBarra">
                Código de Barra:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("CodigoDeBarra")}
                className="form-control"
              />
            </div>
          </div>

          {/* Familia */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="IdArticuloFamilia">
                Familia<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <select
                {...register("IdArticuloFamilia", {
                  required: {
                    value: true,
                    message: "Familia es requerido",
                  },
                })}
                className={
                  "form-control " +
                  (errors?.IdArticuloFamilia ? "is-invalid" : "")
                }
              >
                <option value="">Seleccione una familia...</option>
                {ArticulosFamilias?.map((x) => (
                  <option value={x.IdArticuloFamilia} key={x.IdArticuloFamilia}>
                    {x.Nombre}
                  </option>
                ))}
              </select>
              {errors?.IdArticuloFamilia && touchedFields.IdArticuloFamilia && (
                <div className="invalid-feedback">
                  {errors?.IdArticuloFamilia?.message}
                </div>
              )}
            </div>
          </div>

          {/* Fecha Alta */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaAlta">
                Fecha Alta<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaAlta", {
                  required: {
                    value: true,
                    message: "Fecha Alta es requerido",
                  },
                })}
                className={
                  "form-control " + (errors?.FechaAlta ? "is-invalid" : "")
                }
              />
              {errors?.FechaAlta && touchedFields.FechaAlta && (
                <div className="invalid-feedback">
                  {errors?.FechaAlta?.message}
                </div>
              )}
            </div>
          </div>

          {/* Activo */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="Activo">
                Activo:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="checkbox"
                {...register("Activo")}
                disabled
                className="form-check-input"
              />
            </div>
          </div>
        </fieldset>

        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Grabar
              </button>
            )}
            <button type="button" className="btn btn-warning" onClick={() => Volver()}>
              <i className="fa fa-undo"></i> {AccionABMC === "C" ? "Volver" : "Cancelar"}
            </button>
          </div>
        </div>

        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i> Revisar los datos ingresados...
          </div>
        )}
      </div>
    </form>
  );
}
