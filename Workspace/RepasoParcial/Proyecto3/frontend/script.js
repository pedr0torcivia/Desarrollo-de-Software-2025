let currentEditId = null; // Para saber si estamos editando

document.addEventListener("DOMContentLoaded", function () {
  fetchData(); // Al cargar la página

  const addEmpresaBtn = document.getElementById("addEmpresaBtn");
  const addEmpresaForm = document.getElementById("addEmpresaForm");
  const cancelAddEmpresaBtn = document.getElementById("cancelAddEmpresaBtn");

  addEmpresaBtn.addEventListener("click", function () {
    document.getElementById("createEmpresaForm").reset();
    addEmpresaForm.style.display = "block";
    currentEditId = null;
  });

  cancelAddEmpresaBtn.addEventListener("click", function () {
    addEmpresaForm.style.display = "none";
  });

  const createEmpresaForm = document.getElementById("createEmpresaForm");
  createEmpresaForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData(createEmpresaForm);
    const empresa = Object.fromEntries(formData.entries());
    empresa.cantidadEmpleados = parseInt(empresa.cantidadEmpleados);

    const url = currentEditId
      ? `http://localhost:3000/api/empresas/${currentEditId}`
      : `http://localhost:3000/api/empresas`;
    const method = currentEditId ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(empresa),
      });

      if (response.ok) {
        alert(currentEditId ? "Empresa actualizada" : "Empresa agregada");
        createEmpresaForm.reset();
        addEmpresaForm.style.display = "none";
        currentEditId = null;
        fetchData();
      } else {
        alert("Error al guardar empresa");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  const form = document.getElementById("filterForm");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const nombre = document.getElementById("filtroNombre").value.trim();
    fetchData(nombre);
  });
});

async function fetchData(nombre = "") {
  try {
    const url = nombre
      ? `http://localhost:3000/api/empresas?nombre=${encodeURIComponent(nombre)}`
      : `http://localhost:3000/api/empresas`;

    const response = await fetch(url);
    const data = await response.json();

    const tbody = document.getElementById("empresaTable");
    tbody.innerHTML = "";

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
      tbody.appendChild(row);
    });

    addEventListenersToButtons();
  } catch (error) {
    console.error("Error fetching:", error);
  }
}

function addEventListenersToButtons() {
  document.querySelectorAll(".deleteBtn").forEach(button => {
    button.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");
      if (confirm("¿Eliminar Empresa?")) {
        try {
          const response = await fetch(`http://localhost:3000/api/empresas/${id}`, { method: "DELETE" });
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

  document.querySelectorAll(".editBtn").forEach(button => {
    button.addEventListener("click", async function () {
      const id = this.getAttribute("data-id");
      try {
        const response = await fetch(`http://localhost:3000/api/empresas/${id}`);
        if (!response.ok) throw new Error("No se pudo obtener la empresa");

        const empresa = await response.json();
        currentEditId = id;

        const form = document.getElementById("createEmpresaForm");
        form.nombre.value = empresa.nombre;
        form.razonSocial.value = empresa.razonSocial;
        form.tipoEmpresa.value = empresa.tipoEmpresa;
        form.cantidadEmpleados.value = empresa.cantidadEmpleados;

        document.getElementById("addEmpresaForm").style.display = "block";
      } catch (error) {
        console.error("Error al editar:", error);
      }
    });
  });
}