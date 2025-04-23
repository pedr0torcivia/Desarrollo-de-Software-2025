// ESQUEMA DE USO DE FETCH 

fetch(URL)
  .then(respuesta => respuesta.json())     // Convertimos la respuesta en JSON
  .then(datos => {
    // Acá manipulás los datos recibidos
    console.log(datos); // Por ejemplo, los mostramos
  })
  .catch(error => {
    // Acá manejás errores (por ejemplo, si no hay conexión)
    console.error("Ocurrió un error:", error);
  });
