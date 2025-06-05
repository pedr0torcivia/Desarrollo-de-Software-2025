document.addEventListener("DOMContentLoaded", function () {
  fetchData();

  // Filtro por marca y modelo
  document.getElementById("filterForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const marca = document.getElementById("filtroMarca").value.trim();
    const modelo = document.getElementById("filtroModelo").value.trim();
    fetchData(marca, modelo);
  });

  // Mostrar u ocultar formulario de creación
  document.getElementById("btnMostrarCrear").addEventListener("click", () => {
    const formCrear = document.getElementById("formCrearZapatilla");
    formCrear.style.display = formCrear.style.display === "none" ? "block" : "none";
  });

  // Crear nueva zapatilla
  document.getElementById("btnCrearZapatilla").addEventListener("click", async (event) => {
    event.preventDefault();

    const zapatilla = {
      marca: document.getElementById("marca").value,
      modelo: document.getElementById("modelo").value,
      talle: parseInt(document.getElementById("talle").value),
      precio: parseFloat(document.getElementById("precio").value),
      stock: parseInt(document.getElementById("stock").value),
    };

    try {
      const res = await fetch("http://localhost:3000/zapatillas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(zapatilla),
      });

      if (!res.ok) throw new Error("Error al crear zapatilla");
      alert("Zapatilla registrada correctamente");
      fetchData();
      document.getElementById("formCrearZapatilla").style.display = "none";
    } catch (error) {
      alert(error.message);
    }
  });
});

// Obtener zapatillas con o sin filtro y renderizar con botón de eliminar por fila
async function fetchData(marca = "", modelo = "") {
  try {
    let url = "http://localhost:3000/zapatillas";
    if (marca || modelo) {
      const params = new URLSearchParams();
      if (marca) params.append("marca", marca);
      if (modelo) params.append("modelo", modelo);
      url += "/filtro?" + params.toString();
    }

    const response = await fetch(url);
    const data = await response.json();

    const tbody = document.getElementById("zapatillaTable");
    tbody.innerHTML = "";

    data.forEach((zapatilla) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${zapatilla.idZapatilla}</td>
        <td>${zapatilla.marca}</td>
        <td>${zapatilla.modelo}</td>
        <td>${zapatilla.talle}</td>
        <td>$${zapatilla.precio.toFixed(2)}</td>
        <td>${zapatilla.stock}</td>
        <td>
          <button class="btn btn-sm btn-danger">Eliminar</button>
        </td>
      `;

      // Asigna evento al botón eliminar
      row.querySelector("button").addEventListener("click", async () => {
        if (confirm(`¿Seguro que querés eliminar la zapatilla "${zapatilla.modelo}" (ID ${zapatilla.idZapatilla})?`)) {
          try {
            const res = await fetch(`http://localhost:3000/zapatillas/${zapatilla.idZapatilla}`, {
              method: "DELETE"
            });

            if (res.status === 204) {
              alert("Zapatilla eliminada");
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
    console.error("Error al obtener zapatillas:", error);
  }
}
