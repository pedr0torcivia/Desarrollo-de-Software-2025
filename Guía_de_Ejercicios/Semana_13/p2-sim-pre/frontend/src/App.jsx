import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Encabezado from "./components/Encabezado";
import PiePagina from "./components/PiePagina";
import ListadoJuegos from "./components/ListadoJuegos";
import UltimosEstrenos from "./components/UltimosEstrenos";
import FormularioJuego from "./components/FormularioJuego";

function App() {
  return (
    <BrowserRouter>
      <div className="container-md mt-5">
        <Encabezado />
        <Routes>
          <Route path="/" element={<Navigate to="/juegos/lista" />} />
          <Route path="/juegos/lista" element={<ListadoJuegos />} />
          <Route path="/estrenos" element={<UltimosEstrenos />} />
          <Route path="/juegos/nuevo" element={<FormularioJuego />} />
          <Route path="/juegos/editar/:id" element={<FormularioJuego />} />
        </Routes>
        <PiePagina />
      </div>
    </BrowserRouter>
  );
}

export default App;
