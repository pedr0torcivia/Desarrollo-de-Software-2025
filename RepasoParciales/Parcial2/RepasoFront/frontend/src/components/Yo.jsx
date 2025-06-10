import React from 'react'
import "../styles/Yo.css"


export default function Yo({ nombre }) {
  return (
    <section className="yo-container">
      <h1 className="yo-titulo">Hola Soy <span className="yo-nombre">{nombre}</span></h1>
      <p className="yo-descripcion">
        Bienvenido a mi componente personalizado. Estoy construido con React y tengo estilo propio.
      </p>
    </section>
  );
}
