// Espacio diseñado para el repaso de JS 



// Variables puntero
let a = 1
console.log(`HOLA ${a}`)


// Funcion felcha - SINTAXIS
const suma = (a,b) => a + b 


// POO
// POO
const persona1 = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 18
};

const persona2 = {
    nombre: "Ana",
    apellido: "García",
    edad: 22
};

const persona3 = {
    nombre: "Luis",
    apellido: "Martínez",
    edad: 30
};

const persona4 = {
    nombre: "María",
    apellido: "Lopez",
    edad: 25
};

const personas = [
    persona1,
    persona2,
    persona3,
    persona4
    ];



personas.map(persona => console.log(persona.nombre))

const mayores20 = personas.filter(persona => persona.edad > 20)
console.log(mayores20)