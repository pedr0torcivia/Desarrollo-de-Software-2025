import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mi App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* otros ítems */}
            <li className="nav-item">
              <Link className="nav-link" to="/empleados">Empleados</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
