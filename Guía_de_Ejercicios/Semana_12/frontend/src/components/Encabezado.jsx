import { NavLink, useLocation } from "react-router";

function Encabezado() {
  const location = useLocation();
  const pagina = location.pathname;
  console.log(pagina);
  return (
    <header className="bg-dark text-white py-3 mb-4">
      <div className="ccontainer py-5 h-100 position-relative">
        <div className="usuario-pill">
          <i className="bi bi-person-circle"></i>
          <span>Nombre Apellido</span>
        </div>
        <nav className="mt-3">
          <ul
            className="nav nav-pills nav-fill gap-2 p-1 small bg-primary rounded-5 shadow-sm justify-content-center"
            id="pillNav"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <NavLink
                className={`nav-link rounded-5`}
                to="/"
              >
                Inicio
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                className={`nav-link rounded-5 `}
                to="/estaciones"
              >
                Estaciones
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                className={`nav-link rounded-5`}
                to="/alquileres"
              >
                Alquileres
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                className={`nav-link rounded-5`}
                to="/contacto"
              >
                Contacto
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Encabezado;
