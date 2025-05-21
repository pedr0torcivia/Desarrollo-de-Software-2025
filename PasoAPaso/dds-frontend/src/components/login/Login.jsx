import React, { useState, useEffect } from "react";
import "./Login.css"; //css global
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import AuthService from "../../services/auth.service";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();
  const {componentFrom} = useParams();

  // PUNTO 3: evitar ataque de fuerza bruta
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);

  const navigateToComponent = () => {
    navigate(`/${componentFrom}`);
  };

  const handleIngresar = async () => {
    const success = await AuthService.login(usuario, clave, navigateToComponent);

    if (!success) {
      // PUNTO 3: contar intentos fallidos y bloquear si excede
      const nuevosIntentos = intentosFallidos + 1;
      setIntentosFallidos(nuevosIntentos);

      if (nuevosIntentos >= 5) {
        setBloqueado(true);
        setTimeout(() => {
          setIntentosFallidos(0);
          setBloqueado(false);
        }, 30000); // bloquear 30 segundos
      }
    }
  };

  useEffect(() => {
    AuthService.logout();
  }, []);

  return (
    <div className="divbody text-center">
      <main className="form-signin w-100 m-auto">
        <form className="p-5">
          <img
            className="mb-4"
            src="https://getbootstrap.com/docs/5.2/assets/brand/bootstrap-logo.svg"
            alt=""
            width="72"
            height="57"
          />
          <h1 className="h3 mb-3 fw-normal">Por favor ingrese</h1>

          <div className="form-floating">
            <input
              type="text"
              autoComplete="off"
              placeholder="usuario"
              onChange={(e) => setUsuario(e.target.value)}
              value={usuario}
              autoFocus
              className="form-control"
              id="usuario"
            />
            <label className="custom-control" htmlFor="usuario">
              Usuario
            </label>
          </div>

          <div className="form-floating">
            {/* PUNTO 2: Validación de clave segura (ya lo tenías marcado) */}
            <input
              type="password"
              className="form-control"
              placeholder="clave"
              onChange={(e) => setClave(e.target.value)}
              value={clave}
              id="clave"
            />
            <label className="custom-control" htmlFor="clave">
              Clave
            </label>
          </div>

          {/* PUNTO 3: mensaje cuando se bloquea */}
          {bloqueado && (
            <div className="text-danger mt-3">
              Demasiados intentos fallidos. Espere 30 segundos.
            </div>
          )}

          <div className="checkbox mb-3">
            <label className="custom-control">
              <input type="checkbox" value="remember-me" /> Recordarme
            </label>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary"
            type="button"
            onClick={(e) => handleIngresar()}
            disabled={bloqueado} // PUNTO 3: desactiva el botón
          >
            Ingresar
          </button>
          <p className="mt-5 mb-3 text-muted">© 2024</p>
        </form>
      </main>
    </div>
  );
}

export { Login };
