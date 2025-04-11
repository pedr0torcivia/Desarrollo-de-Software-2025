// EJERCICIOS DE PRACTICA
// EJERCITACION 1: Crear script que permita cargar prcipitaciones promedio en cada mes del país (generadas con valoresa leatorios entre 15 y 35)
// Determinar promedio anual de lluvias, promedio de lluvias para el segundo trimestre y el mes mas seco del año.

const getRandomBetween = (min, max) => Math.random() * (max - min) + min;

const precipitaciones = {
    enero: Math.floor(getRandomBetween(15, 35)),
    febrero: Math.floor(getRandomBetween(15, 35)),
    marzo: Math.floor(getRandomBetween(15, 35)),
    abril: Math.floor(getRandomBetween(15, 35)),
    mayo: Math.floor(getRandomBetween(15, 35)),
    junio: Math.floor(getRandomBetween(15, 35)),
    julio: Math.floor(getRandomBetween(15, 35)),
    agosto: Math.floor(getRandomBetween(15, 35)),
    septiembre: Math.floor(getRandomBetween(15, 35)),
    octubre: Math.floor(getRandomBetween(15, 35)),
    noviembre: Math.floor(getRandomBetween(15, 35)),
    diciembre: Math.floor(getRandomBetween(15, 35)),
}

console.log(precipitaciones);

const promedioAnual = (precipitaciones.enero + precipitaciones.febrero + precipitaciones.marzo + 
    precipitaciones.abril + precipitaciones.mayo + precipitaciones.junio + precipitaciones.julio + 
    precipitaciones.agosto + precipitaciones.septiembre + precipitaciones.octubre + precipitaciones.noviembre 
    + precipitaciones.diciembre) / 12;

console.log("El promedio anual de lluvias es: " + promedioAnual + " mm.");

const promedioTrimestre = (precipitaciones.abril + precipitaciones.mayo + precipitaciones.junio) / 3;
console.log("El promedio de lluvias para el segundo trimestre es: " + promedioTrimestre + " mm.");

const mesSeco = Math.min(precipitaciones.enero, precipitaciones.febrero, precipitaciones.marzo,
    precipitaciones.abril, precipitaciones.mayo, precipitaciones.junio, precipitaciones.julio, 
    precipitaciones.agosto, precipitaciones.septiembre, precipitaciones.octubre, precipitaciones.noviembre, 
    precipitaciones.diciembre);
console.log("El mes mas seco del año es: " + mesSeco + " mm.");

// EJERCITACION 2: PERSONAS. Crear un array con al menos 8 personas. Usar la clase persona previamente definida. Definir funciones que reciban como argumento el array vuelvan:
// 1- Personas mayores de edad: mayoresDeEdad(personas) 
// 2- Persona cuya profesión sea una pasada por argumento, ej: personasXProfesion(personas,'superheroe')
// 3- obtenerPersonaMasGrande(personas), tener en cuenta que ahora recibe como argumento un array con n personas.
// 4- obtenerProfesiones(personas). // sin duplicados

class Persona {
    constructor(nombre, edad, profesion) {
        this.nombre = nombre;
        this.edad = edad;
        this.profesion = profesion;
    }
}

const personas = [
    new Persona("Pedro", 19, "estudiante"),
    new Persona("Juan", 25, "profesor"),
    new Persona("Ana", 22, "ingeniera"),
    new Persona("Maria", 30, "medica"),
    new Persona("Luis", 18, "estudiante"),
    new Persona("Laura", 28, "abogada"),
    new Persona("Carlos", 35, "arquitecto"),
    new Persona("Sofia", 40, "superheroe")
];

function mayoresDeEdad(personas) {
    return personas.filter(persona => persona.edad >= 18);
}

let mayorEdad = mayoresDeEdad(personas);
console.log("Personas mayores de edad: ", mayorEdad); 


function personasXProfesion(personas, profesion) {
    return personas.filter(persona => persona.profesion === profesion);
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

function obtenerPersonaMasGrande(personas) {
    let mayor = personas[0];
    let primero = true;
    for (let i = 0; i<= personas.length - 1; i++) {
        if ((personas[0] <= personas[i]) && primero) {
            mayor = personas[i];
            primero = false;
        }else if (personas[i] > mayor) {
            mayor = personas[i];
        }
    }     return mayor;
}

function obtenerProfesiones(personas) {
    let profesiones = [];
    for (let i = 0; i <= personas.length - 1; i++){
        if (!profesiones.includes(personas[i].profesion)) {
            profesiones.push(personas[i].profesion);
        }
    } return profesiones;
} 


rl.question("¿Cuál es la profesión que desea buscar? ", (profesion) => {
    console.log("Personas con profesión " + profesion + ": ", personasXProfesion(personas, profesion));
    console.log("La persona mas grande es: ", obtenerPersonaMasGrande(personas));   
    console.log("Las profesiones son: ", obtenerProfesiones(personas)); 
    rl.close(); 
});

