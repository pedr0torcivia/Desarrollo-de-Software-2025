import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import PublicPage from "./components/PublicPage";
import ProductoForm from "./components/ProductoForm";
import AppNavbar from "./components/AppNavbar";
import Callback from "./components/Callback";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductosLista from "./components/ProductosLista";
const App = () => (
  <Router>
    <AppNavbar />
    <Routes>
      <Route path="/" element={<PublicPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<Callback />} />
      <Route
        path="/productos"
        element={
          <ProtectedRoute roles={["read_only"]}>
            <ProductosLista />
          </ProtectedRoute>
        }
      />
      <Route
        path="/productos/editar"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ProductoForm />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Router>
);

export default App;
