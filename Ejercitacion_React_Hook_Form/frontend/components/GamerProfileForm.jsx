import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function GamerProfileForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    console.log("Datos del perfil a enviar:", data);
    try {
      const response = await axios.post('http://localhost:3001/api/profile', data);
      console.log("Respuesta del servidor:", response.data);
      alert(`¡Éxito! ${response.data.message}`);
      reset(); // Limpia el formulario tras envío exitoso
    } catch (error) {
      console.error("Error al enviar el perfil:", error);
      if (error.response) {
        alert(`Error del servidor: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        alert("Error: No se pudo conectar con el servidor. ¿Está encendido?");
      } else {
        alert(`Error al procesar la solicitud: ${error.message}`);
      }
    }
  };

  const favoriteGames = ["Valorant", "League of Legends", "Minecraft", "Fortnite", "Cyberpunk 2077"];
  const platforms = ["PC", "PlayStation", "Xbox", "Nintendo Switch"];

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h2>Crear Perfil de Gamer</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Nombre de Usuario */}
            <div className="mb-3">
              <label htmlFor="gamerTag" className="form-label">Nombre de Usuario (Gamer Tag):</label>
              <input
                type="text"
                className={`form-control ${errors.gamerTag ? 'is-invalid' : ''}`}
                id="gamerTag"
                {...register("gamerTag", {
                  required: "El nombre de usuario es obligatorio.",
                  minLength: {
                    value: 5,
                    message: "El nombre de usuario debe tener al menos 5 caracteres."
                  }
                })}
              />
              {errors.gamerTag && <div className="invalid-feedback">{errors.gamerTag.message}</div>}
            </div>

            {/* Contraseña */}
            <div className="mb-3">
              <label htmlFor="password_gamer" className="form-label">Contraseña:</label>
              <input
                type="password"
                className={`form-control ${errors.password_gamer ? 'is-invalid' : ''}`}
                id="password_gamer"
                {...register("password_gamer", {
                  required: "La contraseña es obligatoria.",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres."
                  }
                })}
              />
              {errors.password_gamer && <div className="invalid-feedback">{errors.password_gamer.message}</div>}
            </div>

            {/* Juego Favorito */}
            <div className="mb-3">
              <label htmlFor="favoriteGame" className="form-label">Juego Favorito:</label>
              <select
                className={`form-select ${errors.favoriteGame ? 'is-invalid' : ''}`}
                id="favoriteGame"
                {...register("favoriteGame", { required: "Selecciona tu juego favorito." })}
              >
                <option value="">Selecciona un juego...</option>
                {favoriteGames.map(game => (
                  <option key={game} value={game}>{game}</option>
                ))}
              </select>
              {errors.favoriteGame && <div className="invalid-feedback">{errors.favoriteGame.message}</div>}
            </div>

            {/* Plataforma Principal */}
            <div className="mb-3">
              <label className="form-label">Plataforma Principal:</label>
              {platforms.map(platform => (
                <div className="form-check" key={platform}>
                  <input
                    className={`form-check-input ${errors.platform ? 'is-invalid' : ''}`}
                    type="radio"
                    id={`platform-${platform}`}
                    value={platform}
                    {...register("platform", { required: "Selecciona tu plataforma principal." })}
                  />
                  <label className="form-check-label" htmlFor={`platform-${platform}`}>
                    {platform}
                  </label>
                </div>
              ))}
              {errors.platform && <div className="text-danger d-block mt-1" style={{ fontSize: '.875em' }}>{errors.platform.message}</div>}
            </div>

            {/* Biografía */}
            <div className="mb-3">
              <label htmlFor="bio" className="form-label">Biografía Corta (Opcional):</label>
              <textarea
                className={`form-control ${errors.bio ? 'is-invalid' : ''}`}
                id="bio"
                rows="3"
                {...register("bio", {
                  maxLength: {
                    value: 200,
                    message: "La biografía no puede exceder los 200 caracteres."
                  }
                })}
              ></textarea>
              {errors.bio && <div className="invalid-feedback">{errors.bio.message}</div>}
            </div>

            {/* Acepto Términos */}
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className={`form-check-input ${errors.acceptTerms ? 'is-invalid' : ''}`}
                id="acceptTerms"
                {...register("acceptTerms", {
                  required: "Debes aceptar los términos y condiciones."
                })}
              />
              <label className="form-check-label" htmlFor="acceptTerms">Acepto los términos y condiciones</label>
              {errors.acceptTerms && <div className="invalid-feedback d-block">{errors.acceptTerms.message}</div>}
            </div>

            <button type="submit" className="btn btn-success w-100">Crear Perfil</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GamerProfileForm;
