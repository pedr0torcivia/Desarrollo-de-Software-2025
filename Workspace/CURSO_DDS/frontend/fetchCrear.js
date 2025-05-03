document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("formCrearUsuario");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
  
    const boton = form.querySelector("button[type='submit']");
  
    // Si hay ID, estoy en modo edición: traigo los datos del usuario
    if (id) {
      try {
        const response = await fetch(`http://localhost:4001/usuarios/obtenerById/${id}`);
        const data = await response.json();
  
        console.log("Datos precargados:", data);
  
        // Precargo los campos del formulario
        form.nombre.value = data.nombre;
        form.apellido.value = data.apellido;
        form.usuario.value = data.usuario;
        form.password.value = data.password;
        form.email.value = data.email;
  
        // Cambio el texto del botón
        if (boton) boton.textContent = "Modificar Usuario";
  
      } catch (error) {
        console.error("Error al precargar los datos:", error);
      }
    }
  
    // Cuando se envía el formulario (crear o modificar)
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const usuario = {
        nombre: form.nombre.value,
        apellido: form.apellido.value,
        usuario: form.usuario.value,
        password: form.password.value,
        email: form.email.value
      };
  
      let url;
      let method;
  
      if (id) {
        url = `http://localhost:4001/usuarios/modificar?id=${id}`;
        method = "PUT";
      } else {
        url = "http://localhost:4001/usuarios/crearUsuario";
        method = "POST";
      }
  
      try {
        console.log("Enviando datos a:", url);
        console.log("Payload:", usuario);
  
        const response = await fetch(url, {
          method: method,
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(usuario)
        });
  
        console.log("Status de la respuesta:", response.status);
  
        if (response.ok) {
          console.log("Redirigiendo al index...");
          alert(id ? "Usuario modificado correctamente" : "Usuario creado correctamente");
          window.location.href = "index.html";
        } else {
          const error = await response.json();
          console.warn("Error al guardar:", error);
          alert("Error al guardar los datos: " + (error.error || "desconocido"));
        }
  
      } catch (error) {
        console.error("Error en el envío del formulario:", error);
        alert("Error inesperado al enviar el formulario");
      }
    });
  });
  