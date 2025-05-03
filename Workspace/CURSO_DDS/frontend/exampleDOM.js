document.addEventListener("DOMContentLoaded", function () {
    // Paso 1: Capturar el botón y agregar evento
    const boton = document.getElementById("botonHaceAlgo");
    boton.addEventListener("click", function () {
        alert("Presionaste el botón");
    });

    // Datos de ejemplo
    const datos = [
        { id: 1, nombre: 'Juan' },
        { id: 2, nombre: 'Ana' },
        { id: 3, nombre: 'Luis' },
        { id: 4, nombre: 'Pepe' },
        { id: 5, nombre: 'Tito' }
    ];

    // Paso 2: Capturar cuerpo de tabla
    const cuerpoTabla = document.getElementById("cuerpo_tabla");

    // Paso 3: Vaciar la tabla y cargar filas
    cuerpoTabla.innerHTML = "";
    datos.forEach((elemento) => { 
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${elemento.id}</td>
            <td>${elemento.nombre}</td>
        `;
        cuerpoTabla.appendChild(row); // usamos cuerpoTabla
    });
});
