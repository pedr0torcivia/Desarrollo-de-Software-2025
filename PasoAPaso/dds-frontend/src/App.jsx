import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import {Inicio} from "./components/Inicio";
import {Categorias} from "./components/Categorias";
import {Menu} from "./components/Menu";
import { Footer } from "./components/Footer";

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
            </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
