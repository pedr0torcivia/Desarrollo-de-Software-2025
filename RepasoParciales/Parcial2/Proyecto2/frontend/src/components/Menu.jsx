import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Menu() {
  const navigate = useNavigate();

  return (
    <div className="container_app">
      <h1>Menu</h1>
      <button onClick={() => navigate("/registro")}>Registro</button>
    </div>
  );
}
