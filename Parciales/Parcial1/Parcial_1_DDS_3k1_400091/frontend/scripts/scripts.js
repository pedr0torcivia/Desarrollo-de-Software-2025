// Espera a que se cargue todo el HTML antes de ejecutar JS
document.addEventListener("DOMContentLoaded", () => {
    // Llama a la función para mostrar todos los muebles al inicio
    //  2. Frontend: Listado Inicial (fetch GET /api/muebles) 
    cargarMuebles();
  
    // Asigna evento al botón de búsqueda
    //  4. Frontend: Búsqueda con Fetch (GET /api/muebles?buscar=...)
    const btnBuscar = document.getElementById("btnBuscar");
    btnBuscar.addEventListener("click", () => {
      const textoBusqueda = document.getElementById("inputBusqueda").value.trim();
      cargarMuebles(textoBusqueda);
    });
  });
  
  /**
   * Función que obtiene los muebles desde el backend y los muestra en la tabla.
   * @param {string} buscar - Texto opcional para filtrar por nombre.
   */
  async function cargarMuebles(buscar = "") {
    try {
      // Construye la URL con parámetro si corresponde
      let url = "http://localhost:3000/api/muebles";
      if (buscar) {
        const params = new URLSearchParams({ buscar });
        url += "?" + params.toString();
      }
  
      // Fetch a la API
      const response = await fetch(url);
      const muebles = await response.json();
  
      // Referencias al DOM
      const tbody = document.getElementById("tablaMueblesBody");
      const mensajeVacio = document.getElementById("mensajeVacio");
  
      // Limpia la tabla
      tbody.innerHTML = "";
  
      if (muebles.length === 0) {
        // Si no hay resultados, muestra el mensaje
        mensajeVacio.style.display = "block";
        return;
      }
  
      // Oculta mensaje si había uno previo
      mensajeVacio.style.display = "none";
  
      // Carga cada mueble en la tabla
      muebles.forEach(mueble => {
        const fila = document.createElement("tr");
        
        //Fecha DD/MM/YYYY:
        const fechaFormateada = new Date(mueble.FechaFabricacion).toLocaleDateString("es-AR");
        // Precio con símbolo y decimales:
        const precioFormateado = `$${parseFloat(mueble.PrecioEstimado).toFixed(2)}`;
  
        fila.innerHTML = `
          <td>${mueble.IdMueble.toString().toUpperCase()}</td>
          <td>${mueble.Nombre}</td>
          <td>${mueble.Material}</td>
          <td>${fechaFormateada}</td>
          <td>${precioFormateado}</td>
        `;
  
        tbody.appendChild(fila);
      });
  
    } catch (error) {
      console.error("Error al cargar muebles:", error);
      alert("Ocurrió un error al obtener los muebles.");
    }
  }
  