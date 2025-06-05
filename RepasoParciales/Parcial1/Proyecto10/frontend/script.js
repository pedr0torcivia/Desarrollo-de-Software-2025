document.addEventListener("DOMContentLoaded", function () {
  fetchData();

  // Filtro por legajo
  document.getElementById("filterForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const legajo = document.getElementById("filtroLegajo").value.trim();
    fetchData(legajo);
  });

  // Mostrar u ocultar formulario de creación
  document.getElementById("btnMostrarCrear").addEventListener("click", () => {
    const formCrear = document.getElementById("formCrearParcial");
    formCrear.style.display = formCrear.style.display === "none" ? "block" : "none";
  });

  // Crear nuevo parcial
  document.getElementById("btnCrearParcial").addEventListener("click", async (event) => {
    event.preventDefault();

    const parcial = {
      legajoAlumno: parseInt(document.getElementById("legajoAlumno").value),
      nombreAlumno: document.getElementById("nombreAlumno").value,
      apellidoAlumno: document.getElementById("apellidoAlumno").value,
      materia: document.getElementById("materia").value,
      nota: document.getElementById("nota").value ? parseFloat(document.getElementById("nota").value) : null,
    };

    try {
      const res = await fetch("http://localhost:3000/parciales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parcial),
      });

      if (!res.ok) throw new Error("Error al crear parcial");
      alert("Parcial registrado correctamente");
      fetchData();
      document.getElementById("formCrearParcial").style.display = "none";
    } catch (error) {
      alert(error.message);
    }
  });
});

// Obtener parciales (con o sin filtro por legajo) y renderizar
async function fetchData(legajo = "") {
  try {
    let url = "http://localhost:3000/parciales";
    if (legajo) url += `/filtro?legajo=${legajo}`;

    const response = await fetch(url);
    const data = await response.json();

    const tbody = document.getElementById("parcialTable");
    tbody.innerHTML = "";

    data.forEach((parcial) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${parcial.legajoAlumno}</td>
        <td>${parcial.nombreAlumno}</td>
        <td>${parcial.apellidoAlumno}</td>
        <td>${parcial.materia}</td>
        <td>${parcial.nota ?? "-"}</td>
        <td>
          <button class="btn btn-sm btn-danger">Eliminar</button>
        </td>
      `;

      // Evento eliminar
      row.querySelector("button").addEventListener("click", async () => {
        if (confirm(`¿Seguro que querés eliminar el parcial de ${parcial.nombreAlumno} (Legajo ${parcial.legajoAlumno})?`)) {
          try {
            const res = await fetch(`http://localhost:3000/parciales/${parcial.legajoAlumno}`, {
              method: "DELETE"
            });

            if (res.status === 204) {
              alert("Parcial eliminado");
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
    console.error("Error al obtener parciales:", error);
  }
}
