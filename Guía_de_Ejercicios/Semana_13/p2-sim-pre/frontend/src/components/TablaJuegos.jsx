// src/components/TablaJuegos.jsx

export default function TablaJuegos({ juegos }) {
  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover table-striped">
        <thead className="table-dark text-center">
          <tr>
            <th>Nombre</th>
            <th>Plataforma</th>
            <th>Género</th>
            <th>Fecha Estreno</th>
            <th>Valoración ⭐</th>
            <th>Opiniones</th>
            <th>ESRB</th>
            <th>Sitio Web</th>
          </tr>
        </thead>
        <tbody>
          {juegos.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center">No se encontraron juegos.</td>
            </tr>
          ) : (
            juegos.map((juego) => (
              <tr key={juego.id}>
                <td>{juego.nombre}</td>
                <td>{juego.plataforma?.nombre || "-"}</td>
                <td>{juego.genero}</td>
                <td>{formatearFecha(juego.fechaEstreno)}</td>
                <td className="text-center">{renderEstrellas(juego.valoracion)}</td>
                <td className="text-center">{juego.opiniones}</td>
                <td className="text-center">{renderEsrbIcon(juego.codigoEsrb)}</td>
                <td className="text-center">
                  {juego.urlWeb ? (
                    <a href={juego.urlWeb} target="_blank" rel="noopener noreferrer">
                      Link
                    </a>
                  ) : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

// ⭐ Muestra estrellas (de 1 a 5) según valoracion
function renderEstrellas(valoracion) {
  const estrellas = Math.round(valoracion / 20);
  return "★".repeat(estrellas).padEnd(5, "☆");
}

// 🎮 Mapea íconos ESRB con Font Awesome
function renderEsrbIcon(codigo) {
  const mapa = {
    E: ["fas fa-child text-success", "Everyone"],
    E10: ["fas fa-children text-info", "Everyone 10+"],
    T: ["fas fa-user-graduate text-primary", "Teen"],
    M: ["fas fa-user-shield text-warning", "Mature"],
    AO: ["fas fa-ban text-danger", "Adults Only"],
    RP: ["fas fa-hourglass-half text-secondary", "Rating Pending"],
    UR: ["fas fa-question-circle text-muted", "Unrated"]
  };

  const [icono, tooltip] = mapa[codigo] || ["fas fa-question", "Desconocido"];
  return <i className={icono} title={tooltip}></i>;
}

// 📆 Fecha legible
function formatearFecha(fecha) {
  const f = new Date(fecha);
  return f.toLocaleDateString("es-AR");
}
