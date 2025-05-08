document.addEventListener("DOMContentLoaded", function () {
  fetchData();

  // Filtro por título y género
  document.getElementById("filterForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const titulo = document.getElementById("filtroTitulo").value.trim();
    const genero = document.getElementById("filtroGenero").value.trim();
    fetchData(titulo, genero);
  });

  // Mostrar u ocultar formulario de creación
  document.getElementById("btnMostrarCrear").addEventListener("click", () => {
    const formCrear = document.getElementById("formCrearPelicula");
    formCrear.style.display = formCrear.style.display === "none" ? "block" : "none";
  });

  // Crear nueva película
  document.getElementById("btnCrearPelicula").addEventListener("click", async (event) => {
    event.preventDefault();

    const pelicula = {
      titulo: document.getElementById("titulo").value,
      director: document.getElementById("director").value,
      anioEstreno: parseInt(document.getElementById("anioEstreno").value),
      genero: document.getElementById("genero").value,
      puntajeIMDB: parseFloat(document.getElementById("puntajeIMDB").value) || null,
    };

    try {
      const res = await fetch("http://localhost:3000/peliculas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pelicula),
      });

      if (!res.ok) throw new Error("Error al crear película");
      alert("Película registrada correctamente");
      fetchData();
      document.getElementById("formCrearPelicula").style.display = "none";
    } catch (error) {
      alert(error.message);
    }
  });
});

// Obtener películas con o sin filtro y renderizar con botón de eliminar por fila
async function fetchData(titulo = "", genero = "") {
  try {
    let url = "http://localhost:3000/peliculas";
    if (titulo || genero) {
      const params = new URLSearchParams();
      if (titulo) params.append("titulo", titulo);
      if (genero) params.append("genero", genero);
      url += "/filtro?" + params.toString();
    }

    const response = await fetch(url);
    const data = await response.json();

    const tbody = document.getElementById("peliculaTable");
    tbody.innerHTML = "";

    data.forEach((pelicula) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pelicula.idPelicula}</td>
        <td>${pelicula.titulo}</td>
        <td>${pelicula.director}</td>
        <td>${pelicula.anioEstreno}</td>
        <td>${pelicula.genero}</td>
        <td>${pelicula.puntajeIMDB ?? "-"}</td>
        <td>
          <button class="btn btn-sm btn-danger">Eliminar</button>
        </td>
      `;

      // Asigna evento al botón eliminar
      row.querySelector("button").addEventListener("click", async () => {
        if (confirm(`¿Seguro que querés eliminar la película "${pelicula.titulo}" (ID ${pelicula.idPelicula})?`)) {
          try {
            const res = await fetch(`http://localhost:3000/peliculas/${pelicula.idPelicula}`, {
              method: "DELETE"
            });

            if (res.status === 204) {
              alert("Película eliminada");
              fetchData();
            } else {
              const error = await res.json();
              alert(error.error || "Error al eliminar");
            }
          } catch (error) {
            alert("Error de conexión");
          }
        }
      });

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al obtener películas:", error);
  }
}
