document.addEventListener("DOMContentLoaded", function () {
  fetchData();

  document.getElementById("filterForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const cliente = document.getElementById("filtroCliente").value.trim();
    fetchData(cliente);
  });

  // Mostrar u ocultar el formulario de creación
  document.getElementById("btnMostrarCrear").addEventListener("click", () => {
    const formCrear = document.getElementById("formCrear");
    formCrear.style.display = formCrear.style.display === "none" ? "block" : "none";
  });

  // Mostrar u ocultar campo para eliminar por ID
  document.getElementById("btnMostrarEliminar").addEventListener("click", () => {
    const section = document.getElementById("eliminarSection");
    section.style.display = section.style.display === "none" ? "block" : "none";
  });

  // Crear nueva reparación
  document.getElementById("btnCrear").addEventListener("click", async (event) => {
    event.preventDefault();

    const reparacion = {
      fechaRecepcion: document.getElementById("fechaRecepcion").value,
      nombreCliente: document.getElementById("nombreCliente").value,
      tipoEquipo: document.getElementById("tipoEquipo").value,
      descripcionProblema: document.getElementById("descripcionProblema").value,
      estado: document.getElementById("estado").value,
      costoEstimado: document.getElementById("costoEstimado").value || null,
      pagado: document.getElementById("pagado").value === "true"
    };

    try {
      const res = await fetch("http://localhost:3000/reparaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reparacion)
      });

      if (!res.ok) throw new Error("Error al crear reparación");
      alert("Reparación registrada");
      fetchData();
      document.getElementById("formCrear").style.display = "none";
    } catch (error) {
      alert(error.message);
    }
  });

  // Eliminar reparación por ID
  document.getElementById("btnEliminar").addEventListener("click", async () => {
    const id = document.getElementById("idReparacion").value;
    if (!id) return alert("Ingresá un ID");

    if (confirm(`¿Seguro que querés eliminar la reparación con ID ${id}?`)) {
      try {
        const res = await fetch(`http://localhost:3000/reparaciones/${id}`, {
          method: "DELETE"
        });

        if (res.status === 204) {
          alert("Reparación eliminada");
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

// Obtener todas o filtradas
async function fetchData(cliente = "") {
  try {
    const url = cliente
      ? `http://localhost:3000/reparaciones/buscar/${encodeURIComponent(cliente)}`
      : `http://localhost:3000/reparaciones`;

    const response = await fetch(url);
    const data = await response.json();

    const tbody = document.getElementById("reparacionTable");
    tbody.innerHTML = "";

    data.forEach((rep) => {
      const fecha = new Date(rep.fechaRecepcion);
      const fechaFormateada = `${fecha.getFullYear()}/${(fecha.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${fecha.getDate().toString().padStart(2, "0")}`;

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${rep.idReparacion}</td>
        <td>${fechaFormateada}</td>
        <td>${rep.nombreCliente}</td>
        <td>${rep.tipoEquipo}</td>
        <td>${rep.descripcionProblema}</td>
        <td>${rep.estado}</td>
        <td>${rep.costoEstimado ?? "-"}</td>
        <td>${rep.pagado ? "Sí" : "No"}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Error al obtener reparaciones:", error);
  }
}
