/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
async function cargarBarrios() {
    try {
        const response = await fetch("http://localhost:3000/api/barrios");
        if (!response.ok) throw new Error("Error al cargar los barrios");

        const barrios = await response.json();
        const select = document.getElementById("barrio");

        // Limpiar opciones actuales
        select.innerHTML = "";

        // Agregar opción "Todos"
        const opcionTodos = document.createElement("option");
        opcionTodos.value = "Todos";
        opcionTodos.textContent = "Todos";
        opcionTodos.selected = true;
        select.appendChild(opcionTodos);

        // Agregar barrios desde el endpoint
        barrios.forEach((barrio) => {
            const option = document.createElement("option");
            option.value = barrio.nombre;
            option.textContent = barrio.nombre;
            select.appendChild(option);
        });
    }
    catch (error) {
        console.error("⚠️ No se pudieron cargar los barrios:", error);
    }
}
