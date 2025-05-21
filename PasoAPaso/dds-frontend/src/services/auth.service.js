import httpService from "./http.service";
import { config } from "../config"; 
import modalService from "./modalDialog.service";

const login = async (usuario, clave, navigateToComponent) => {
  let resp = await httpService.post(config.urlServidor + "/api/login", {
    usuario,
    clave,
  });

  if (resp.data?.accessToken) {
    sessionStorage.setItem("usuarioLogueado", usuario);
    sessionStorage.setItem("accessToken", resp.data.accessToken);
    sessionStorage.setItem("refreshToken", resp.data.refreshToken);
    if (CambioUsuarioLogueado) CambioUsuarioLogueado(usuario);

    // 🔁 redirigir si corresponde
    if (navigateToComponent) navigateToComponent();
  } else {
    if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
    modalService.Alert("Usuario o clave incorrectos");
  }
};

const logout = () => {
  sessionStorage.removeItem("usuarioLogueado");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  if (CambioUsuarioLogueado) CambioUsuarioLogueado(null);
};

const getUsuarioLogueado = () => {
  return sessionStorage.getItem("usuarioLogueado");
};

// 🔁 funciones agregadas para que http.service.js acceda al token
const getAccessToken = () => {
  return sessionStorage.getItem("accessToken");
};

const getRefreshToken = () => {
  return sessionStorage.getItem("refreshToken");
};

let CambioUsuarioLogueado = null;
const subscribeUsuarioLogueado = (x) => (CambioUsuarioLogueado = x);

const AuthService = {
  login,
  logout,
  getUsuarioLogueado,
  subscribeUsuarioLogueado,
  getAccessToken,       // ✅ agregado
  getRefreshToken       // ✅ agregado
};

export default AuthService;
