// --- CALLBACKS ---
// Un callback es una función que se pasa como argumento a otra función
function saludar(nombre, callback) {
    console.log("Hola, " + nombre);
    callback();
  }
  
  function despedirse() {
    console.log("Adiós!");
  }
  
  saludar("Pedro", despedirse); // Ejecuta 'saludar' y luego 'despedirse'
  
  // --- ASINCRONISMO ---
  // JavaScript ejecuta operaciones asincrónicas sin bloquear el flujo principal
  
  console.log("Inicio");
  
  // Simulación de una operación que tarda (como una petición al servidor)
  setTimeout(() => {
    console.log("Operación asincrónica completada");
  }, 2000);
  
  console.log("Fin");
  // El mensaje 'Fin' aparece antes que 'Operación asincrónica completada'
  
  // --- PROMESAS ---
  // Una promesa representa un valor que puede estar disponible ahora, más tarde o nunca
  
  function obtenerDatos() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const exito = true;
        if (exito) {
          resolve("Datos recibidos correctamente");
        } else {
          reject("Error al obtener datos");
        }
      }, 1500);
    });
  }
  
  // Usamos .then() para manejar el resultado exitoso, y .catch() para manejar errores
  obtenerDatos()
    .then((resultado) => {
      console.log("Promesa resuelta:", resultado);
    })
    .catch((error) => {
      console.error("Promesa rechazada:", error);
    });
  
  // --- PROMESAS CON async/await ---
  // Otra forma más clara de escribir promesas
  
  async function ejecutarConsulta() {
    try {
      const resultado = await obtenerDatos();
      console.log("Con async/await:", resultado);
    } catch (error) {
      console.error("Con async/await (error):", error);
    }
  }
  
  ejecutarConsulta();
  