// Define la URL base del backend (ajústala si el puerto o dominio cambia)
const BASE_URL = "http://localhost:3000/api/pacientes";

// Espera a que el DOM se haya cargado completamente antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
  cargarPacientes(); // Carga los pacientes al iniciar la página

  // Búsqueda en tiempo real (buscando por Propietario)
  const searchInput = document.getElementById("search");
  searchInput.addEventListener("input", () => {
    cargarPacientes(searchInput.value); // Actualiza la lista de pacientes con el filtro de búsqueda
  });

  // Manejar el envío del formulario (para agregar o editar un paciente)
  const form = document.getElementById("form-paciente");
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevenir que se recargue la página al enviar el formulario

    // Obtener los valores de los campos del formulario
    const id = document.getElementById("paciente-id").value;
    const NombreMascota = document.getElementById("NombreMascota").value;
    const Propietario = document.getElementById("Propietario").value;
    const Telefono = document.getElementById("Telefono").value;
    const pacienteData = { NombreMascota, Propietario, Telefono };

    // Si se tiene un ID (edición), se actualiza; si no, se crea uno nuevo
    if (id) {
      await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT', // Método para actualizar un paciente existente
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pacienteData) // Enviar los datos del paciente en formato JSON
      });
    } else {
      await fetch(BASE_URL, {
        method: 'POST', // Método para crear un nuevo paciente
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pacienteData) // Enviar los datos del paciente en formato JSON
      });
    }

    // Reiniciamos el formulario y actualizamos la lista de pacientes
    form.reset();
    document.getElementById("paciente-id").value = "";
    document.getElementById("form-title").textContent = "Agregar / Editar Paciente";
    document.getElementById("cancel-button").style.display = "none"; // Ocultar el botón de cancelar
    cargarPacientes(); // Recargar la lista de pacientes
  });

  // Botón para cancelar la edición de un paciente
  const cancelButton = document.getElementById("cancel-button");
  cancelButton.addEventListener("click", () => {
    form.reset(); // Limpiar el formulario
    document.getElementById("paciente-id").value = ""; // Limpiar el ID del paciente
    document.getElementById("form-title").textContent = "Agregar / Editar Paciente"; // Restablecer título del formulario
    cancelButton.style.display = "none"; // Ocultar el botón de cancelar
  });
});

// Función para cargar y mostrar la lista de pacientes, con filtro por propietario (si se pasa)
async function cargarPacientes(filtro = "") {
  try {
    // Crear la URL de la API con el filtro si se proporciona
    const url = filtro
      ? `${BASE_URL}?propietario=${encodeURIComponent(filtro)}`
      : BASE_URL;

    // Realizar la solicitud para obtener los pacientes desde el backend
    const response = await fetch(url);
    const pacientes = await response.json(); // Convertir la respuesta a formato JSON

    const listContainer = document.getElementById("patients-list");
    listContainer.innerHTML = ""; // Limpiar la lista antes de agregar nuevos pacientes

    // Crear una fila por cada paciente y agregarla a la tabla
    pacientes.forEach(paciente => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${paciente.NombreMascota}</td>
        <td>${paciente.Propietario}</td>
        <td>${paciente.Telefono || 'N/A'}</td>
        <td>
          <button class="btn btn-warning btn-sm btn-edit" data-id="${paciente.IdPaciente}">Editar</button>
          <button class="btn btn-danger btn-sm btn-delete" data-id="${paciente.IdPaciente}">Eliminar</button>
        </td>
      `;
      listContainer.appendChild(row);
    });

    // Asigna el evento para eliminar cada paciente
    document.querySelectorAll(".btn-delete").forEach(button => {
      button.addEventListener("click", async () => {
        const id = button.getAttribute("data-id"); // Obtener el ID del paciente
        if (confirm("¿Seguro que deseas eliminar este paciente?")) { // Confirmar antes de eliminar
          await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' }); // Eliminar el paciente en el backend
          cargarPacientes(); // Recargar la lista de pacientes
        }
      });
    });

    // Asigna el evento para editar cada paciente
    document.querySelectorAll(".btn-edit").forEach(button => {
      button.addEventListener("click", async () => {
        const id = button.getAttribute("data-id"); // Obtener el ID del paciente a editar
        const response = await fetch(`${BASE_URL}/${id}`); // Solicitar los datos del paciente
        const paciente = await response.json(); // Convertir la respuesta a JSON

        // Rellenar el formulario con los datos del paciente
        document.getElementById("paciente-id").value = paciente.IdPaciente;
        document.getElementById("NombreMascota").value = paciente.NombreMascota;
        document.getElementById("Propietario").value = paciente.Propietario;
        document.getElementById("Telefono").value = paciente.Telefono;
        document.getElementById("form-title").textContent = "Editar Paciente"; // Cambiar el título del formulario
        document.getElementById("cancel-button").style.display = "inline-block"; // Mostrar el botón de cancelar
      });
    });
  } catch (error) {
    console.error("Error al cargar pacientes:", error); // Manejo de errores si algo falla
  }
}
