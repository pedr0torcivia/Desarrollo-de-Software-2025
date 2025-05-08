// frontend/script.js

// Idiomas soportados para el <select> de filtro (valores ISO 639-1)
const idiomasDisponibles = [
  { codigo: "en", nombre: "Inglés" },
  { codigo: "es", nombre: "Español" },
  { codigo: "fr", nombre: "Francés" },
  { codigo: "it", nombre: "Italiano" },
  { codigo: "de", nombre: "Alemán" },
  { codigo: "ja", nombre: "Japonés" },
  { codigo: "zh", nombre: "Chino" },
  { codigo: "ko", nombre: "Coreano" },
  { codigo: "pt", nombre: "Portugués" },
  { codigo: "ru", nombre: "Ruso" },
  { codigo: "hi", nombre: "Hindi" }
];

// Carga inicial
document.addEventListener("DOMContentLoaded", () => {
  cargarSelectIdiomas();
  cargarPeliculasPopulares();

  document.getElementById("filterForm").addEventListener("submit", (e) => {
    e.preventDefault();
    aplicarFiltros();
  });
});

// Llena el <select> con los idiomas disponibles
function cargarSelectIdiomas() {
  const select = document.getElementById("lenguaje");
  idiomasDisponibles.forEach(({ codigo, nombre }) => {
    const option = document.createElement("option");
    option.value = codigo;
    option.textContent = nombre;
    select.appendChild(option);
  });
}

// Carga las películas populares desde el backend
async function cargarPeliculasPopulares() {
  try {
    const res = await fetch("http://localhost:3000/api/movies/populares");
    const data = await res.json();
    renderizarTabla(data);
  } catch (err) {
    console.error("Error al cargar películas populares:", err);
  }
}

// Aplica los filtros de búsqueda
async function aplicarFiltros() {
  const titulo = document.getElementById("titulo").value.trim();
  const lenguaje = document.getElementById("lenguaje").value;

  if (!titulo && !lenguaje) {
    cargarPeliculasPopulares(); // Si no hay filtros, recarga populares
    return;
  }

  const params = new URLSearchParams();
  if (titulo) params.append("titulo", titulo);
  if (lenguaje) params.append("lenguaje", lenguaje);

  try {
    const res = await fetch(`http://localhost:3000/api/movies?${params.toString()}`);
    const data = await res.json();
    renderizarTabla(data);
  } catch (err) {
    console.error("Error al aplicar filtros:", err);
  }
}

// Muestra las películas en la tabla HTML
function renderizarTabla(peliculas) {
  const tbody = document.getElementById("tablaPeliculas");
  tbody.innerHTML = "";

  if (peliculas.length === 0) {
    const fila = document.createElement("tr");
    fila.innerHTML = `<td colspan="6" class="text-center text-muted">No se encontraron resultados</td>`;
    tbody.appendChild(fila);
    return;
  }

  peliculas.forEach(p => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.title}</td>
      <td>${p.releaseDate}</td>
      <td>${p.language}</td>
      <td>${p.runtime ?? "-"}</td>
      <td>${p.budgetMillions}</td>
      <td>${p.voteAverage}</td>
    `;
    tbody.appendChild(fila);
  });
}
