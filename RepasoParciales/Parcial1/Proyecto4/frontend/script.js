let currentEditId = null; // Variable global para saber si se está editando una empresa (null si se está creando una nueva)

document.addEventListener("DOMContentLoaded", function () {
  fetchData(); // Al cargar la página, se obtienen y muestran las empresas

  const addPacienteBtn = document.getElementById("addPacienteBtn"); // Botón para mostrar el formulario de nueva empresa
  const addPacienteForm = document.getElementById("addPacienteForm"); // Contenedor del formulario de alta
  const cancelAddPacienteBtn = document.getElementById("cancelAddPacienteBtn"); // Botón para cancelar la creación

  // Al hacer clic en "Agregar Empresa", se limpia y muestra el formulario
  addPacienteBtn.addEventListener("click", function () {
    document.getElementById("createPacienteForm").reset(); // Limpia el formulario
    addPacienteForm.style.display = "block"; // Muestra el formulario
    currentEditId = null; // Asegura que estamos creando (no editando)
  });

  // Al cancelar, se oculta el formulario
  cancelAddPacienteBtn.addEventListener("click", function () {
    addPacienteForm.style.display = "none"; // Oculta el formulario
  });

  const createPacienteForm = document.getElementById("createPacienteForm"); // Formulario de creación/edición
  createPacienteForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    const formData = new FormData(createPacienteForm); // Obtiene datos del formulario
    const paciente = Object.fromEntries(formData.entries()); // Convierte a objeto plano
    paciente.telefono = parseInt(paciente.telefono); // Asegura que cantidadEmpleados sea número

    const url = currentEditId
      ? `http://localhost:3000/api/pacientes/${currentEditId}` // Si hay id, es edición
      : `http://localhost:3000/api/pacientes`; // Si no, es creación
    const method = currentEditId ? "PUT" : "POST"; // Define método HTTP según sea edición o creación

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paciente), // Envia el objeto empresa como JSON
      });

      if (response.ok) {
        alert(currentEditId ? "Paciente actualizado" : "Paciente agregado");
        createPacienteForm.reset(); // Limpia el formulario
        addPacienteForm.style.display = "none"; // Oculta el formulario
        currentEditId = null; // Resetea el estado
        fetchData(); // Refresca la tabla
      } else {
        alert("Error al guardar paciente");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // Formulario de búsqueda por nombre
  const form = document.getElementById("filterForm");
  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Previene recarga
    const paciente = document.getElementById("filtroPaciente").value.trim(); // Obtiene valor del input
    fetchData(paciente); // Llama a fetchData con el filtro aplicado
  });
});

// Función que obtiene datos de empresas y llena la tabla
async function fetchData(nombre = "") {
  try {
    const url = nombre
      ? `http://localhost:3000/api/pacientes?nombre=${encodeURIComponent(nombre)}` // URL con filtro
      : `http://localhost:3000/api/pacientes`; // URL sin filtro

    const response = await fetch(url);
    const data = await response.json(); // Convierte la respuesta a JSON

    const tbody = document.getElementById("pacienteTable");
    tbody.innerHTML = ""; // Limpia la tabla antes de llenarla

    // Crea una fila por cada empresa recibida
    data.forEach(paciente => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${paciente.propietario}</td>
        <td>${paciente.nombreMascota}</td>
        <td>${paciente.telefono}</td>
        <td>
          <button class="btn btn-warning editBtn" data-id="${paciente.id}">Editar</button>
          <button class="btn btn-danger deleteBtn" data-id="${paciente.id}">Eliminar</button>
        </td>
      `;
      tbody.appendChild(row); // Agrega la fila a la tabla
    });

    addEventListenersToButtons(); // Asigna eventos a botones de editar y eliminar
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

// Asigna eventos a los botones de editar y eliminar en cada fila
function addEventListenersToButtons() {
  // Botones de eliminar
  document.querySelectorAll(".deleteBtn").forEach(button => {
    button.addEventListener("click", async function () {
      const id = this.getAttribute("data-id"); // Obtiene ID de la empresa
      if (confirm("¿Eliminar Paciente?")) {
        try {
          const response = await fetch(`http://localhost:3000/api/pacientes/${id}`, { method: "DELETE" });
          if (response.ok) {
            fetchData(); // Refresca la tabla
          } else {
            alert("Error al eliminar");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    });
  });

  // Botones de editar
  document.querySelectorAll(".editBtn").forEach(button => {
    button.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");
      try {
        const response = await fetch(`http://localhost:3000/api/pacientes/${id}`);
        if (!response.ok) throw new Error("No se pudo obtener el paciente");

        const empresa = await response.json();
        currentEditId = id; // Marca que estamos editando esta empresa

        const form = document.getElementById("createEmpresaForm");
        form.propietario.value = paciente.propietario;
        form.nombreMascota.value = paciente.nombreMascota;
        form.telefono.value = paciente.telefono;

        document.getElementById("addPacienteForm").style.display = "block"; // Muestra el formulario
      } catch (error) {
        console.error("Error al editar:", error);
      }
    });
  });
}
