import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Inicio} from "./components/Inicio";
import {Categorias} from "./components/Categorias";
import {Menu} from "./components/Menu";
import { Footer } from "./components/Footer";
import { Articulos } from "./components/articulos/Articulos"

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <div className="divBody">
            <Routes>
              <Route path="/inicio" element={<Inicio />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="*" element={<Navigate to="/Inicio" replace />} />
              <Route path="/articulos" element={<Articulos/>} />
            </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
