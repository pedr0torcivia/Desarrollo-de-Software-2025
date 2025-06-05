document.addEventListener("DOMContentLoaded", function () {
  fetchData();

  // Evento de filtrado por título
  document.getElementById("filterForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const titulo = document.getElementById("filtroTitulo").value.trim();
    fetchData(titulo);
  });
});

// Obtener todos los libros o filtrar por título
async function fetchData(titulo = "") {
  try {
    const url = titulo
      ? `http://localhost:3000/api/libros?search=${encodeURIComponent(titulo)}`
      : `http://localhost:3000/api/libros`;

    const response = await fetch(url);
    const data = await response.json();

    const tbody = document.getElementById("librosTable");
    tbody.innerHTML = "";

    if (data.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="4" class="text-center text-muted">No se encontraron libros</td>`;
      tbody.appendChild(row);
      return;
    }

    data.forEach((libro) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${libro.IdLibro}</td>
        <td>${libro.Titulo}</td>
        <td>${libro.Autor}</td>
        <td>${libro.AnioPublicacion}</td>
        <td>
          <button class="btn btn-sm btn-danger" onclick="eliminarLibro(${libro.IdLibro})">
            Eliminar
          </button>
        </td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al obtener libros:", error);
  }
}

// Eliminar un libro por ID
async function eliminarLibro(id) {
  if (!confirm(`¿Seguro que querés eliminar el libro con ID ${id}?`)) return;

  try {
    const res = await fetch(`http://localhost:3000/api/libros/${id}`, {
      method: "DELETE",
    });

    if (res.status === 204) {
      alert("Libro eliminado");
      fetchData();
    } else {
      const error = await res.json();
      alert(error.error || "Error al eliminar");
    }
  } catch (error) {
    alert("Error de conexión con el servidor");
  }
}
