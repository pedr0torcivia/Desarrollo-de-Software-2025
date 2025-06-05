document.addEventListener("DOMContentLoaded", function () {
  fetchData();

  // Filtro de nombre y especialidad
  document.getElementById("filterForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const nombre = document.getElementById("filtroCliente").value.trim();
    const especialidad = document.getElementById("especialidadFiltro").value.trim();
    fetchData(nombre, especialidad);
  });

  // Mostrar u ocultar el formulario de creación
  document.getElementById("btnMostrarCrear").addEventListener("click", () => {
    const formCrear = document.getElementById("formCrearTurno");
    formCrear.style.display = formCrear.style.display === "none" ? "block" : "none";
  });

  // Mostrar u ocultar campo para eliminar por ID
  document.getElementById("btnMostrarEliminar").addEventListener("click", () => {
    const section = document.getElementById("eliminarSection");
    section.style.display = section.style.display === "none" ? "block" : "none";
  });

  // Crear nuevo turno
  document.getElementById("btnCrearTurno").addEventListener("click", async (event) => {
    event.preventDefault();

    const turno = {
      fechaTurno: document.getElementById("fechaTurno").value,
      nombrePaciente: document.getElementById("nombrePaciente").value,
      especialidad: document.getElementById("especialidad").value,
      medicoAsignado: document.getElementById("medicoAsignado").value,
      estado: document.getElementById("estadoTurno").value,
      observaciones: document.getElementById("observaciones").value || null,
    };

    try {
      const res = await fetch("http://localhost:3000/turnos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(turno)
      });

      if (!res.ok) throw new Error("Error al crear turno");
      alert("Turno registrado");
      fetchData();
      document.getElementById("formCrearTurno").style.display = "none";
    } catch (error) {
      alert(error.message);
    }
  });

  // Eliminar turno por ID
  document.getElementById("btnEliminarTurno").addEventListener("click", async () => {
    const id = document.getElementById("idTurno").value;
    if (!id) return alert("Ingresá un ID");

    if (confirm(`¿Seguro que querés eliminar el turno con ID ${id}?`)) {
      try {
        const res = await fetch(`http://localhost:3000/turnos/${id}`, {
          method: "DELETE"
        });

        if (res.status === 204) {
          alert("Turno eliminado");
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
});

// Obtener todos los turnos o por filtro
async function fetchData(nombre = "", especialidad = "") {
  try {
    let url = "http://localhost:3000/turnos";
    if (nombre || especialidad) {
      const params = new URLSearchParams();
      if (nombre) params.append("nombre", nombre);
      if (especialidad) params.append("especialidad", especialidad);
      url += "/filtro?" + params.toString();
    }

    const response = await fetch(url);
    const data = await response.json();

    const tbody = document.getElementById("turnoTable");
    tbody.innerHTML = "";

    data.forEach((turno) => {
      const fecha = new Date(turno.fechaTurno).toLocaleDateString('es-AR');
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${turno.idTurno}</td>
        <td>${fecha}</td>
        <td>${turno.nombrePaciente}</td>
        <td>${turno.especialidad}</td>
        <td>${turno.medicoAsignado}</td>
        <td>${turno.estado}</td>
        <td>${turno.observaciones ?? "-"}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al obtener turnos:", error);
  }
}
