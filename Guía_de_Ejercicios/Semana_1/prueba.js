console.log("Hola desde Node.js");

// Intentamos usar localStorage (fallará en Node.js)
try {
    localStorage.setItem("clave", "Esto no funciona en Node.js");
} catch (error) {
    console.error("Error con localStorage en Node.js:", error);
}

// Accedemos al sisema de archivos (permitido en Node.js)
const fs = require("fs");

fs.writeFileSync("prueba.txt", "Esto fue escrito desde Node.js");
console.log("Archivo creado exitosamente.");

//Leemos el archivo creado
const contenido = fs.readFileSync("prueba.txt", "utf-8");
console.log("Contenido del archivo:", contenido);
