import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Registro from './components/Registro';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
