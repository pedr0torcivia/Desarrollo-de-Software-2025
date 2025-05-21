import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Inicio } from "./components/Inicio";
import { ArticulosFamilias } from "./components/ArticulosFamilias";
import { Menu } from "./components/Menu";
import { Footer } from "./components/Footer";
import { Articulos } from "./components/articulos/Articulos";
import { ModalDialog } from "./components/ModalDialog";
import { ArticulosJWT } from "./components/articulosJWT/ArticulosJWT";
import { RequireAuth } from "./components/RequiereAuth";
import { Login } from "./components/login/Login";

function App() {
  return (
    <BrowserRouter>
      <ModalDialog />
      <Menu />
      <div className="divBody  px-4">
        <Routes>
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/articulosfamilias" element={<ArticulosFamilias />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route
            path="/articulosjwt"
            element={
              <RequireAuth rol="admin">
                <ArticulosJWT />
              </RequireAuth>
            }
          />
          <Route path="/login/:componentFrom" element={<Login />} />
          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;