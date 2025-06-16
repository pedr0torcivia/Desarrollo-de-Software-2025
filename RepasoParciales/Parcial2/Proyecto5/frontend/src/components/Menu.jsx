import { Link, useNavigate } from 'react-router-dom';

export default function Menu() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand">Menú Principal</Link>

        <button
          className="btn btn-outline-light"
          onClick={() => navigate('/deudores')}
        >
          Deudores
        </button>
      </div>
    </nav>
  );
}
