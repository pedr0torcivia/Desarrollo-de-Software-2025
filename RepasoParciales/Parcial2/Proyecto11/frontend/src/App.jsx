import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Empleado from "./components/Empleado";
import Navbar from "./components/Navbar"; // Asegurate de tener este archivo

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/empleados" element={<Empleado />} />
          <Route path="*" element={<p>Seleccione una opción del menú.</p>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
