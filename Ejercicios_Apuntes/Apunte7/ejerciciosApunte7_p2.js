const fs = require('fs');
// Leer archivo JSON y convertir el texto en objeto. 
let datos;
try {
    datos = fs.readFileSync('C:/Users/PEDRO_T/portafolio_400091_torcivia/Ejercicios_Apuntes/Apunte7/personas.json', 'utf8');
} catch (error) {
    console.error("❌ No se pudo leer el archivo: ", error.message);
    process.exit(1); // Sale del programa si falla la lectura
}
let objeto = JSON.parse(datos); // Contiene el objeto con las personas
let personas = objeto.personas; // Acceder a la propiedad personas del objeto

const  mayoresDeEdad = (personas) => {
    return personas.filter(persona => persona.edad >= 18);
}

const personasXProfesion = (personas, profesion) => {
    return personas.filter(persona => persona.profesion === profesion);
}

function obtenerMasGrande(personas) {
    let mayor = personas[0];
    let primero = true; 

    for (let i=0; i <= personas.length - 1; i++) {
        if ((personas[0].edad <= personas[i].edad) && primero) {
            mayor = personas[i];
            primero = false; 
        } else if (personas[i].edad > mayor.edad) {
            mayor = personas[i];
        }
    }     
     return mayor;
}

function obtenerProfesiones(personas) {
    let profesiones = [];

    for (let i=0; i <= personas.length -1; i++) {
        if (!profesiones.includes(personas[i].profesion)) {
            profesiones.push(personas[i].profesion);
        }
    }
    return profesiones;
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

console.log("Personas mayores de edad: ");
console.table(mayoresDeEdad(personas));
console.log("Personas con profesión Estudiante: ");
console.table(personasXProfesion(personas, "Estudiante"));
console.log("Persona mas grande: ", obtenerMasGrande(personas));
console.log("Lista de profesiones: ", obtenerProfesiones(personas));

rl.question("¿Cuál es la profesión que desea buscar? ", (profesion) => { 
    console.log("Personas con profesión " + profesion + ": ", personasXProfesion(personas, profesion));  
    rl.close(); 
}
)



// Convertir el objeto en un string y escribirlo en un archivo JSON, NO SE UTILIZA EN ESTE CASO PERO ES IMPORTANTE REMARCARLO.
fs.writeFileSync('personas.json', JSON.stringify(objeto, null, 2), 'utf8');
