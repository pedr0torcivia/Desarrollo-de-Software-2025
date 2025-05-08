const tipos = {
  1: "Aceites",
  2: "Repuestos",
  3: "Insumos Maquinaria",
  4: "Varios"
};

document.getElementById("formFiltro").addEventListener("submit", async (e) => {
  e.preventDefault();
  const nombre = document.getElementById("filtroNombre").value;
  await cargarProductos(nombre);
});

async function cargarProductos(nombre = "") {
  const url = nombre
    ? `http://localhost:4000/productos?nombre=${encodeURIComponent(nombre)}`
    : "http://localhost:4000/productos";

  const res = await fetch(url);
  const productos = await res.json();
  renderTabla(productos);
}

function renderTabla(productos) {
  const tbody = document.querySelector("#tablaProductos tbody");
  tbody.innerHTML = "";

  productos.forEach(prod => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${prod.nombre}</td>
      <td>${tipos[prod.tipo] || "Desconocido"}</td>
      <td>${prod.precio}</td>
      <td>${prod.marca || "-"}</td>
      <td>${prod.aReponer === "S" ? "Sí" : "No"}</td>
    `;
    tbody.appendChild(fila);
  });
}

