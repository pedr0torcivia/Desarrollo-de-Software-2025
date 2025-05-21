import { NavLink } from "react-router-dom";

function Menu() {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-md">
      <a className="navbar-brand"><i className="fa fa-industry"></i> &nbsp;<i>Pymes</i></a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item"><NavLink className="nav-link" to="/inicio">Inicio</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/articulosfamilias">Articulos Familias</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to="/articulos">Articulos</NavLink></li>
        </ul>
      </div>
    </nav>
  );
}
export { Menu };
