import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Deudores from './components/Deudores';

export default function App() {
  return (
    <BrowserRouter>
      <Menu />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={
            <div className="p-4 border rounded shadow-sm bg-light">
              <h4>Bienvenido a la aplicación de gestión de deudores</h4>
              <p>Utilizá el botón "Deudores" del menú para comenzar.</p>
            </div>
          } />
          <Route path="/deudores" element={<Deudores />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
