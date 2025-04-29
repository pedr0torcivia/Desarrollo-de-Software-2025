// frontend/script.js

// Define la URL base del backend (ajústala si el puerto o dominio cambia)
const BASE_URL = "http://localhost:3000/api/pacientes";

document.addEventListener("DOMContentLoaded", () => {
  cargarPacientes();

  // Búsqueda en tiempo real (buscando por Propietario)
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", () => {
    cargarPacientes(searchInput.value);
  });

  // Manejar el envío del formulario (para agregar o editar un paciente)
  const form = document.getElementById("form-paciente");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("paciente-id").value;
    const NombreMascota = document.getElementById("NombreMascota").value;
    const Propietario = document.getElementById("Propietario").value;
    const Telefono = document.getElementById("Telefono").value;
    const pacienteData = { NombreMascota, Propietario, Telefono };

    // Si se tiene ID, se actualiza; si no, se crea
    if (id) {
      await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pacienteData)
      });
    } else {
      await fetch(BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pacienteData)
      });
    }

    // Reiniciamos el formulario y recargamos la lista de pacientes
    form.reset();
    document.getElementById("paciente-id").value = "";
    document.getElementById("form-title").textContent = "Agregar / Editar Paciente";
    document.getElementById("cancel-button").style.display = "none";
    cargarPacientes();
  });

  // Botón para cancelar la edición
  const cancelButton = document.getElementById("cancel-button");
  cancelButton.addEventListener("click", () => {
    form.reset();
    document.getElementById("paciente-id").value = "";
    document.getElementById("form-title").textContent = "Agregar / Editar Paciente";
    cancelButton.style.display = "none";
  });
});

// Función para cargar y mostrar la lista de pacientes, con filtro por propietario (si se pasa)
async function cargarPacientes(filtro = "") {
  try {
    const url = filtro
      ? `${BASE_URL}?propietario=${encodeURIComponent(filtro)}`
      : BASE_URL;
    const response = await fetch(url);
    const pacientes = await response.json();
    const listContainer = document.getElementById("patients-list");
    listContainer.innerHTML = "";
    
    pacientes.forEach(paciente => {
      const card = document.createElement("div");
      card.className = "col-md-4 mb-3";
      card.innerHTML = `
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${paciente.NombreMascota}</h5>
            <p class="card-text"><strong>Propietario:</strong> ${paciente.Propietario}</p>
            <p class="card-text"><strong>Teléfono:</strong> ${paciente.Telefono || 'N/A'}</p>
            <button class="btn btn-warning btn-edit" data-id="${paciente.IdPaciente}">Editar</button>
            <button class="btn btn-danger btn-delete" data-id="${paciente.IdPaciente}">Eliminar</button>
          </div>
        </div>
      `;
      listContainer.appendChild(card);
    });

    // Asigna el evento para eliminar cada paciente
    document.querySelectorAll(".btn-delete").forEach(button => {
      button.addEventListener("click", async () => {
        const id = button.getAttribute("data-id");
        if (confirm("¿Seguro que deseas eliminar este paciente?")) {
          await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
          cargarPacientes();
        }
      });
    });

    // Asigna el evento para editar cada paciente
    document.querySelectorAll(".btn-edit").forEach(button => {
      button.addEventListener("click", async () => {
        const id = button.getAttribute("data-id");
        const response = await fetch(`${BASE_URL}/${id}`);
        const paciente = await response.json();

        document.getElementById("paciente-id").value = paciente.IdPaciente;
        document.getElementById("NombreMascota").value = paciente.NombreMascota;
        document.getElementById("Propietario").value = paciente.Propietario;
        document.getElementById("Telefono").value = paciente.Telefono;
        document.getElementById("form-title").textContent = "Editar Paciente";
        document.getElementById("cancel-button").style.display = "inline-block";
      });
    });
  } catch (error) {
    console.error("Error al cargar pacientes:", error);
  }
}

  