// MAIN: Se ejecuta cuando el DOM está completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    fetchData(); // Carga inicial de todos los usuarios

    const form = document.getElementById("filterForm"); // Captura el formulario

    // Cuando se envía el formulario
    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Evita recarga de página

        const nombre = form.nombre.value;
        const apellido = form.apellido.value;

        await filtrarUsuarios(nombre, apellido); // Aplica filtros
    });
});


// Función para mostrar todos los usuarios
async function fetchData() {
    try {
        const response = await fetch('http://localhost:4001/usuarios/obtenerTodos'); // Pido todos los usuarios
        const data = await response.json(); // Paso la respuesta a JSON

        const tbody = document.getElementById('cuerpo-tabla'); // Capturo el cuerpo de la tabla
        tbody.innerHTML = ''; // Limpio lo anterior

        // Creo una fila por cada usuario
        data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.nombre}</td>
                <td>${user.apellido}</td>
                <td>${user.usuario}</td>
                <td>${user.email}</td>
                <td>
                    <div class="d-flex flex-wrap gap-2">
                    <button class="btn btn-sm btn-primary" onclick="editarUsuario(${user.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${user.id})">Eliminar</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error al cargar usuarios:', error);
    }
}


// Función para filtrar usuarios por nombre y/o apellido
async function filtrarUsuarios(nombre, apellido) {
    try {
        const response = await fetch(`http://localhost:4001/usuarios/byFilters?nombre=${nombre}&apellido=${apellido}`);
        const data = await response.json();

        const tbody = document.getElementById("cuerpo-tabla");
        tbody.innerHTML = ''; // Limpio la tabla

        // Muestro solo los usuarios que cumplen el filtro
        data.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.nombre}</td>
                <td>${user.apellido}</td>
                <td>${user.usuario}</td>
                <td>${user.email}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al filtrar usuarios:", error);
    }
}

// Funcion para Editar o Eliminar usuarios
function editarUsuario(id) {
    // Redirigís a una página con el ID por query param (puede cargar el form con datos)
    window.location.href = `crearUsuario.html?id=${id}`;
}

async function eliminarUsuario(id) {
    if (confirm("¿Seguro que querés eliminar este usuario?")) {
        try {
            const res = await fetch(`http://localhost:4001/usuarios/usuarioABorrar?id=${id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                alert("Usuario eliminado");
                fetchData(); // refresca la tabla
            } else {
                alert("Error al eliminar");
            }
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    }
}
