import PiePagina from "./components/PiePagina.jsx";
import Inicio from "./pages/Inicio.jsx";
import { Estaciones } from "./pages/Estaciones.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { NuevaEstacion } from "./pages/NuevaEstacion.jsx";
import { Login } from "./pages/Login.jsx";
import { AppLayout } from "./Layouts/AppLayout.jsx";
import { Register } from "./pages/Register.jsx";
import { NuevoAlquiler } from "./pages/NuevoAlquiler.jsx";
import { ClienteLayout } from "./Layouts/ClienteLayout.jsx";

function App() {
  return (
    <>      
    <BrowserRouter>
      <Routes>
        <Route path="cliente" element={<ClienteLayout />}>
          <Route index element={<NuevoAlquiler/>}/>
        </Route>
        <Route path="/iniciar-sesion" element={<Login/>} />
        <Route path="/registrar" element={<Register/>} />
        <Route element={<AppLayout />}>
          <Route index element={<Inicio />} />
          <Route path="estaciones">
            <Route index element={<Estaciones/>}/>
            <Route path="nueva-estacion" element={<NuevaEstacion/>}/>
          </Route>
        </Route>
      </Routes>
      <PiePagina />
    </BrowserRouter>
    </>
  );
}

export default App;
