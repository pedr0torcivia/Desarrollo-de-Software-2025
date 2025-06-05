// script.js
let currentEditId = null; // Debe estar fuera para ser accesible desde cualquier función

document.addEventListener("DOMContentLoaded", function () {
  fetchData(); // Al cargar la página, obtiene y muestra los álbumes

  const addAlbumBtn = document.getElementById("addAlbumBtn");
  const addAlbumForm = document.getElementById("addAlbumForm");
  const cancelAddAlbumBtn = document.getElementById("cancelAddAlbumBtn");

  // Mostrar el formulario para agregar o editar
  addAlbumBtn.addEventListener("click", function () {
    document.getElementById("createAlbumForm").reset(); // Limpia el formulario
    addAlbumForm.style.display = "block";
    currentEditId = null; // Indicamos que es creación, no edición
  });

  // Ocultar el formulario
  cancelAddAlbumBtn.addEventListener("click", function () {
    addAlbumForm.style.display = "none";
  });

  const createAlbumForm = document.getElementById("createAlbumForm");
  createAlbumForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevenir recarga de la página

    const formData = new FormData(createAlbumForm);
    const album = Object.fromEntries(formData.entries());
    album.precio = parseInt(album.precio); // Convertir precio a número

    const url = currentEditId
      ? `http://localhost:3000/api/albumes/${currentEditId}`
      : `http://localhost:3000/api/albumes`;
    const method = currentEditId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(album),
      });

      if (response.ok) {
        alert(currentEditId ? "Álbum actualizado" : "Álbum agregado");
        createAlbumForm.reset();
        addAlbumForm.style.display = "none";
        currentEditId = null; // Limpiar ID tras guardar
        fetchData(); // Recargar tabla
      } else {
        alert("Error al guardar álbum");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // Filtro por artista
  const form = document.getElementById("filterForm");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const artista = document.getElementById("filtroArtista").value.trim();
    fetchData(artista);
  });
});

// Obtener los álbumes, opcionalmente filtrados por artista
async function fetchData(artista = "") {
  try {
    const url = artista
      ? `http://localhost:3000/api/albumes?artista=${encodeURIComponent(artista)}`
      : `http://localhost:3000/api/albumes`;

    const response = await fetch(url);
    const data = await response.json();

    const tbody = document.getElementById("albumTable");
    tbody.innerHTML = ""; // Limpiar tabla

    // Llenar tabla
    data.forEach(album => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${album.artista}</td>
        <td>${album.album}</td>
        <td>${album.genero}</td>
        <td>${album.precio}</td>
        <td>
          <button class="btn btn-warning editBtn" data-id="${album.id}">Editar</button>
          <button class="btn btn-danger deleteBtn" data-id="${album.id}">Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });

    addEventListenersToButtons(); // Volver a asignar eventos
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

// Asignar eventos a botones de la tabla
function addEventListenersToButtons() {
  // Eliminar
  document.querySelectorAll(".deleteBtn").forEach(button => {
    button.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");
      if (confirm("¿Eliminar álbum?")) {
        try {
          const response = await fetch(`http://localhost:3000/api/albumes/${id}`, { method: "DELETE" });
          if (response.ok) {
            fetchData();
          } else {
            alert("Error al eliminar");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
  });

  // Editar
  document.querySelectorAll(".editBtn").forEach(button => {
    button.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");
      try {
        const response = await fetch(`http://localhost:3000/api/albumes/${id}`);
        if (!response.ok) throw new Error("No se pudo obtener el álbum");

        const album = await response.json();
        currentEditId = id; // Marcar que estamos editando este álbum

        const form = document.getElementById("createAlbumForm");
        form.artista.value = album.artista;
        form.album.value = album.album;
        form.genero.value = album.genero;
        form.soporte.value = album.soporte || ""; // soporte puede ser opcional
        form.precio.value = album.precio;

        document.getElementById("addAlbumForm").style.display = "block";
      } catch (error) {
        console.error("Error al editar:", error);
      }
    });
  });
}
