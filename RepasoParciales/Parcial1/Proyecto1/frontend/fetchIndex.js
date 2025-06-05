document.addEventListener("DOMContentLoaded", function () {
    fetchData();

    // Mostrar formulario para agregar un nuevo usuario
    const addUserBtn = document.getElementById("addUserBtn");
    const addUserForm = document.getElementById("addUserForm");
    const cancelAddUserBtn = document.getElementById("cancelAddUserBtn");

    addUserBtn.addEventListener("click", function() {
        addUserForm.style.display = "block";
    });

    cancelAddUserBtn.addEventListener("click", function() {
        addUserForm.style.display = "none";
    });

    const createUserForm = document.getElementById("createUserForm");
    createUserForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const nombre = createUserForm.nombre.value;
        const apellido = createUserForm.apellido.value;
        const usuario = createUserForm.usuario.value;
        const email = createUserForm.email.value;

        try {
            const response = await fetch("http://localhost:3000/usuarios/crearUsuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombre, apellido, usuario, email })
            });

            if (response.ok) {
                alert("Usuario agregado exitosamente");
                addUserForm.style.display = "none";
                fetchData(); // Refrescar la lista de usuarios
            } else {
                alert("Error al agregar el usuario");
            }
        } catch (error) {
            console.error("Error al agregar usuario: ", error);
        }
    });

    const form = document.getElementById("filterForm");
    form.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevenir actualización de la página
        
        const nombre = form.nombre.value.trim();
        const apellido = form.apellido.value.trim();
    
        try {
            const response = await fetch(`http://localhost:3000/usuarios/Buscar?nombre=${nombre}&apellido=${apellido}`);
            const usuarios = await response.json();
            
            const tbody = document.getElementById("userTable");
            tbody.innerHTML = "";

            usuarios.forEach(usuario => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.usuario}</td>
                    <td>${usuario.email}</td>
                    <td>
                        <button class="btn btn-warning editBtn" data-id="${usuario.id}">Editar</button>
                        <button class="btn btn-danger deleteBtn" data-id="${usuario.id}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(row);
            });

            addEventListenersToButtons();
        } catch (error) {
            console.error("Error fetching: ", error);
        }
    });
});

async function fetchData() {
    try {

        

        const tbody = document.getElementById("userTable");
        tbody.innerHTML = "";

        data.forEach(usuario => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${usuario.id}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellido}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.email}</td>
                <td>
                    <button class="btn btn-warning editBtn" data-id="${usuario.id}">Editar</button>
                    <button class="btn btn-danger deleteBtn" data-id="${usuario.id}">Eliminar</button>
                </td>
            `;
            tbody.appendChild(row);
        });

        addEventListenersToButtons();
    } catch (error) {
        console.error("Error fetching: ", error);
    }
}

function addEventListenersToButtons() {
    document.querySelectorAll(".editBtn").forEach(button => {
        button.addEventListener("click", async function() {
            const userId = this.getAttribute("data-id");

            try {
                const response = await fetch(`http://localhost:3000/usuarios/obtenerById/${userId}`);
                const usuario = await response.json();

                document.getElementById("nombre").value = usuario.nombre;
                document.getElementById("apellido").value = usuario.apellido;
                document.getElementById("usuario").value = usuario.usuario;
                document.getElementById("email").value = usuario.email;

                addUserForm.style.display = "block";

                const createUserForm = document.getElementById("createUserForm");
                createUserForm.addEventListener("submit", async function(event) {
                    event.preventDefault();

                    const nombre = createUserForm.nombre.value;
                    const apellido = createUserForm.apellido.value;
                    const usuario = createUserForm.usuario.value;
                    const email = createUserForm.email.value;

                    const updateResponse = await fetch(`http://localhost:3000/usuarios/actualizarUsuario/${userId}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ nombre, apellido, usuario, email })
                    });

                    if (updateResponse.ok) {
                        alert("Usuario actualizado");
                        addUserForm.style.display = "none";
                        fetchData(); // Refrescar la lista de usuarios
                    } else {
                        alert("Error al actualizar el usuario");
                    }
                });
            } catch (error) {
                console.error("Error al editar usuario: ", error);
            }
        });
    });

    document.querySelectorAll(".deleteBtn").forEach(button => {
        button.addEventListener("click", async function() {
            const userId = this.getAttribute("data-id");

            try {
                const response = await fetch(`http://localhost:3000/usuarios/eliminarUsuario/${userId}`, {
                    method: "DELETE"
                });

                if (response.ok) {
                    alert("Usuario eliminado exitosamente");
                    fetchData(); // Refrescar la lista de usuarios
                } else {
                    alert("Error al eliminar el usuario");
                }
            } catch (error) {
                console.error("Error al eliminar usuario: ", error);
            }
        });
    });
}