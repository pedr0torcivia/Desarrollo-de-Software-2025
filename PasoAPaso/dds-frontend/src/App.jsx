import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Inicio} from "./components/Inicio";
import {Categorias} from "./components/Categorias";
import {Menu} from "./components/Menu";
import { Footer } from "./components/Footer";
import { Articulos } from "./components/articulos/Articulos"
import { ModalDialog } from "./components/ModalDialog";
import { Usuarios } from "./components/Usuarios";
import {RequireAuth} from "./components/RequireAuth" ;
import { Login } from "./components/login/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <ModalDialog/>
        <Menu />
        <div className="divBody">
             <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/articulos" element={<Articulos />} />
              <Route
                path="/usuarios"
                element={
                  <RequireAuth>
                    <Usuarios />
                  </RequireAuth>
                }
              />
              <Route path="/login/:componentFrom" element={<Login />} />
              <Route path="*" element={<Navigate to="/inicio" replace />} />
            </Routes>

        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;

// ¿Qué pasa si el usuario se autentica, está trabajando con la aplicación y le expira el token?
// Se recibe una respuesta HTTP 401 (Unauthorized) al intentar acceder a un recurso protegido.
// En ese caso, el frontend debe interceptar dicha respuesta (por ejemplo, con un interceptor de Axios o un middleware global de fetch)
// y automáticamente intentar renovar el token usando un refresh token previamente guardado de forma segura (idealmente en HttpOnly cookie o memoria).

// ¿Cómo asegurar que se use una clave segura, con una cantidad mínima de caracteres que incluya mayúsculas, minúsculas y signos especiales?
// En el formulario de registro y cambio de contraseña, se debe implementar una validación que exija:
// al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial.
// Esto puede realizarse con una expresión regular, y también debe validarse del lado del backend para reforzar la seguridad.

// ¿Cómo evitar que mediante un ataque de fuerza bruta descubran las claves de los usuarios?
// - Limitar la cantidad de intentos de login por IP o por usuario (rate limiting).
// - Implementar CAPTCHA tras varios intentos fallidos.
// - Usar hashing seguro para las contraseñas (por ejemplo, bcrypt con salt).
// - Detectar patrones anómalos de acceso e implementar bloqueos temporales o definitivos.

// ¿Qué pasa cuando un usuario logueado accede a una ruta protegida (actualmente validada con RequiereAuth), pero no cumple con la autorización?
// Actualmente, puede ver la interfaz gráfica aunque no tenga permisos, aunque no se llame a la API.
// Esto no es deseable: se debe bloquear la visualización de la UI también.
// Para lograrlo, se debe consultar los permisos del usuario al cargar el componente (por ejemplo, rol o claims)
// y, si no tiene los permisos adecuados, redirigir automáticamente a una página de error o al login,
// evitando renderizar la vista protegida del frontend.
