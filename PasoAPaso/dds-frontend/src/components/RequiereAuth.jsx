import { Navigate, useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";
import { jwtDecode } from "jwt-decode"; 

// PUNTO 4: proteger por autenticación y autorización sin mostrar interfaz no autorizada
export function RequireAuth({ children, rol }) {
  const location = useLocation();
  const token = AuthService.getAccessToken();

  if (!token) {
    return <Navigate to={`/login${location.pathname}`} replace />;
  }

  try {
    const payload = jwtDecode(token);

    if (rol && payload.rol !== rol) {
      // Usuario autenticado pero sin permiso → NO renderiza nada
      return (
        <div className="container text-center mt-5">
          <h2>Acceso denegado</h2>
          <p>No tenés permisos para acceder a esta sección.</p>
        </div>
      );
    }

    return children;
  } catch {
    return <Navigate to="/login" replace />;
  }
}
