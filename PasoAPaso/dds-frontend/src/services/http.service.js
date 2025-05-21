import axios from "axios";
import modalService from "./modalDialog.service";
import AuthService from "./auth.service.js"; // 🔁 PUNTO 1: necesario para gestionar tokens

const httpService = axios.create({
  headers: {
    "Content-type": "application/json",
  },
});

httpService.interceptors.request.use(
  (request) => {
    modalService.BloquearPantalla(true);
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = "Bearer " + accessToken;
    }
    return request;
  },
  (error) => {
    console.log("error en axios request", error);
    return Promise.reject(error);
  }
);

httpService.interceptors.response.use(
  (response) => {
    modalService.BloquearPantalla(false);
    return response;
  },
  async (error) => {
    console.log("error en axios response ", error);
    modalService.BloquearPantalla(false);

    // 🔁 PUNTO 1: interceptar 401 para renovar el accessToken usando refreshToken
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      sessionStorage.getItem("refreshToken")
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        const response = await axios.post("/api/token", { refreshToken });
        const nuevoAccessToken = response.data.accessToken;

        // Guardar nuevo token
        sessionStorage.setItem("accessToken", nuevoAccessToken);
        originalRequest.headers["Authorization"] = "Bearer " + nuevoAccessToken;

        // Reintentar la petición original
        return httpService(originalRequest);
      } catch (refreshError) {
        console.error("Error al renovar el token", refreshError);
        AuthService.logout(); // limpiar sesión si falla
        modalService.Alert("Sesión expirada. Debe volver a iniciar sesión.");
        return Promise.reject(refreshError);
      }
    }

    // otros errores
    if (error.response?.status === 401) {
      error.message = "Debe loguearse para acceder a esta funcionalidad";
    } else if (error.response?.status === 403) {
      error.message = "Usuario no autorizado para acceder a esta funcionalidad";
    } else {
      error.message =
        error?.response?.data?.message ??
        "Actualmente tenemos inconvenientes en el servidor, por favor intente más tarde";
    }

    modalService.Alert(error.message);
    return Promise.reject(error);
  }
);

export default httpService;
