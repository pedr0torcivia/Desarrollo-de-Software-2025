let currentEditId = null; // Variable global para saber si se está editando una empresa (null si se está creando una nueva)

document.addEventListener("DOMContentLoaded", function () {
  fetchData(); // Al cargar la página, se obtienen y muestran las empresas

  const addEmpresaBtn = document.getElementById("addEmpresaBtn"); // Botón para mostrar el formulario de nueva empresa
  const addEmpresaForm = document.getElementById("addEmpresaForm"); // Contenedor del formulario de alta
  const cancelAddEmpresaBtn = document.getElementById("cancelAddEmpresaBtn"); // Botón para cancelar la creación

  // Al hacer clic en "Agregar Empresa", se limpia y muestra el formulario
  addEmpresaBtn.addEventListener("click", function () {
    document.getElementById("createEmpresaForm").reset(); // Limpia el formulario
    addEmpresaForm.style.display = "block"; // Muestra el formulario
    currentEditId = null; // Asegura que estamos creando (no editando)
  });

  // Al cancelar, se oculta el formulario
  cancelAddEmpresaBtn.addEventListener("click", function () {
    addEmpresaForm.style.display = "none"; // Oculta el formulario
  });

  const createEmpresaForm = document.getElementById("createEmpresaForm"); // Formulario de creación/edición
  createEmpresaForm.addEventListener("submit", async function (event) {
    event.preventDefault(); // Evita que el formulario recargue la página

    const formData = new FormData(createEmpresaForm); // Obtiene datos del formulario
    const empresa = Object.fromEntries(formData.entries()); // Convierte a objeto plano
    empresa.cantidadEmpleados = parseInt(empresa.cantidadEmpleados); // Asegura que cantidadEmpleados sea número

    const url = currentEditId
      ? `http://localhost:3000/api/empresas/${currentEditId}` // Si hay id, es edición
      : `http://localhost:3000/api/empresas`; // Si no, es creación
    const method = currentEditId ? "PUT" : "POST"; // Define método HTTP según sea edición o creación

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empresa), // Envia el objeto empresa como JSON
      });

      if (response.ok) {
        alert(currentEditId ? "Empresa actualizada" : "Empresa agregada");
        createEmpresaForm.reset(); // Limpia el formulario
        addEmpresaForm.style.display = "none"; // Oculta el formulario
        currentEditId = null; // Resetea el estado
        fetchData(); // Refresca la tabla
      } else {
        alert("Error al guardar empresa");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  // Formulario de búsqueda por nombre
  const form = document.getElementById("filterForm");
  form.addEventListener("submit", async function (event) {
    event.preventDefault(); // Previene recarga
    const nombre = document.getElementById("filtroNombre").value.trim(); // Obtiene valor del input
    fetchData(nombre); // Llama a fetchData con el filtro aplicado
  });
});

// Función que obtiene datos de empresas y llena la tabla
async function fetchData(nombre = "") {
  try {
    const url = nombre
      ? `http://localhost:3000/api/empresas?nombre=${encodeURIComponent(nombre)}` // URL con filtro
      : `http://localhost:3000/api/empresas`; // URL sin filtro

    const response = await fetch(url);
    const data = await response.json(); // Convierte la respuesta a JSON

    const tbody = document.getElementById("empresaTable");
    tbody.innerHTML = ""; // Limpia la tabla antes de llenarla

    // Crea una fila por cada empresa recibida
    data.forEach(empresa => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${empresa.nombre}</td>
        <td>${empresa.razonSocial}</td>
        <td>${empresa.tipoEmpresa}</td>
        <td>${empresa.cantidadEmpleados}</td>
        <td>
          <button class="btn btn-warning editBtn" data-id="${empresa.id}">Editar</button>
          <button class="btn btn-danger deleteBtn" data-id="${empresa.id}">Eliminar</button>
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
      if (confirm("¿Eliminar Empresa?")) {
        try {
          const response = await fetch(`http://localhost:3000/api/empresas/${id}`, { method: "DELETE" });
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
        const response = await fetch(`http://localhost:3000/api/empresas/${id}`);
        if (!response.ok) throw new Error("No se pudo obtener la empresa");

        const empresa = await response.json();
        currentEditId = id; // Marca que estamos editando esta empresa

        const form = document.getElementById("createEmpresaForm");
        form.nombre.value = empresa.nombre;
        form.razonSocial.value = empresa.razonSocial;
        form.tipoEmpresa.value = empresa.tipoEmpresa;
        form.cantidadEmpleados.value = empresa.cantidadEmpleados;

        document.getElementById("addEmpresaForm").style.display = "block"; // Muestra el formulario
      } catch (error) {
        console.error("Error al editar:", error);
      }
    });
  });
}
