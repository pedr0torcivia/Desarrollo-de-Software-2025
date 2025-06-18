import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

export default function LibroFormulario({ libroSeleccionado, onGuardar, onCancelar }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (libroSeleccionado) {
      setValue('Titulo', libroSeleccionado.Titulo);
      setValue('Autor', libroSeleccionado.Autor);
      setValue('AnioPublicacion', libroSeleccionado.AnioPublicacion);
    } else {
      reset();
    }
  }, [libroSeleccionado, setValue, reset]);

  const onSubmit = (data) => {
    const libro = { ...data };
    if (libroSeleccionado?.id) {
      libro.id = libroSeleccionado.id;
    }
    onGuardar(libro);
    reset();
  };

  return (
    <div className="container mt-4">
      <h2>{libroSeleccionado ? 'Editar Libro' : 'Nuevo Libro'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="mb-3">
          <label className="form-label">Título</label>
          <input
            className={`form-control ${errors.Titulo ? 'is-invalid' : ''}`}
            {...register('Titulo', { required: 'El título es obligatorio' })}
          />
          {errors.Titulo && <div className="invalid-feedback">{errors.Titulo.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Autor</label>
          <input
            className={`form-control ${errors.Autor ? 'is-invalid' : ''}`}
            {...register('Autor', { required: 'El autor es obligatorio' })}
          />
          {errors.Autor && <div className="invalid-feedback">{errors.Autor.message}</div>}
        </div>

        <div className="mb-3">
          <label className="form-label">Año de Publicación</label>
          <input
            type="number"
            className={`form-control ${errors.AnioPublicacion ? 'is-invalid' : ''}`}
            {...register('AnioPublicacion', {
              min: { value: -1000, message: 'Debe ser mayor a -1000' },
              max: { value: new Date().getFullYear(), message: 'No puede ser del futuro' }
            })}
          />
          {errors.AnioPublicacion && (
            <div className="invalid-feedback">{errors.AnioPublicacion.message}</div>
          )}
        </div>

        <button className="btn btn-success me-2" type="submit">Guardar</button>
        <button type="button" className="btn btn-secondary" onClick={onCancelar}>Cancelar</button>
      </form>
    </div>
  );
}
