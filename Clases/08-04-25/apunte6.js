/* VARIABLES */
let x = 10;
console.log(x);
console.log("HOla soy pedro");

nombre = "Pedro";
apellido = "Torcivia";
let mensaje = nombre + " " + apellido;
console.log(mensaje);
console.log(mensaje[0]);
console.log(mensaje.length);
console.log('Hola mi nombre es ${mensaje}');

console.log(nombre);
const PI = 3.14; 
console.log("La largatija: \n Cosmica")

monto = 100;
if (monto > 60) {
    console.log("monto mayor");
} else {
    console.log("menor")
}

// SWITCH: condicional similar a if else

switch (monto) {
    case 19: console.log("monto 19"); break;
    case 20: console.log("monto 20"); break;    
    case 21: console.log("monto 21"); break;
    case 100: console.log("monto 100"); break;
    default: console.log("monto no encontrado"); break;    
}

// OPERADOR TERNARIO ?
// (condicion) ? (si es verdadero) : (si es falso)
let edad = 18;
let resultado = (edad >= 18) ? "es mayor" : "es menor";
console.log(resultado);

// BUCLE FOR
// for (inicializacion; condicion; incremento) { instrucciones }
// inicializacion: se deckara la variable de control del bucle. 
// condicion: se evalua antes de cada iteracion. Si es true, se ejecuta el bloque 
// de instrucciones.
// incremento: se ejecuta al final de cada iteracion. 
// Se utiliza para modificar la variable de control. Se suele colocar i++
// o i-- que incrementa o decrementa la variable en 1.

let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
for (let i = 0; i < 10; i++) {
    console.log(numeros[i]);
    console.log("Estemos en la iteracion " + i);
    console.log("El valor de i es " + i);
}

// BUCLE WHILE
// Se ejecuta mientras la condicion sea true.


let i = 0;
while (i < 10) {
    console.log("Este es el número: " + i);
    i++; 
}

// BUCLE DO WHILE
// Se ejecuta al menos una vez. Se evalua la condicion al final del bucle.

let o = 0;
do {
    o++;
    console.log("NUMBER: " + o);
} while (o < 15) 


let nombreIterado = "Pedro";
for (let i = 0; i < nombreIterado.length; i++) {
    console.log(nombre[i]);
    if (nombre[i] == "d") {
        console.log("Se ha encontrado la letra d en la posicion " + (i + 1));
    }
}

// BREAK: comando que se utiliza para salir de un bucle.
// CONTINUE: comando que se utiliza para saltar a la siguiente iteracion del bucle.

// FUNCIONES: se declaran usando la palabra reservada function.
// Se pueden declarar de dos formas: funciones declarativas y funciones expresivas.
// Las funciones declarativas se declaran usando la palabra reservada function y un nombre.
// Las funciones expresivas se declaran usando la palabra reservada function y no tienen nombre.

let num = 2;

function cubo(num) {
    return num * num * num;
}

let res = cubo(num);
console.log(res);

// Expresar una funcion como una variable implica que la funcion no tiene nombre.
// Se puede asignar a una variable y se puede llamar como si fuera una funcion declarativa.
// Se puede pasar como parametro a otra funcion.

const suma = function (a,b) {
    return a + b;
}

// Llamado de funciones
// Expresion de funcion invocada inmediatamente (IIFE): se ejecuta inmediatamente al ser declarada.

(function () {
    let number = Math.random() * 10;
    console.log(number >= 5);
}) ();

// INPUT DESDE UN HTML
// const variable = document.getElementById("ID_VARIABLE").value;
// ID_VARIABLE: es el id del elemento HTML que queremos obtener a través de cierto
// input en el documento.



// FUNCIONES EJERCICIOS 
// EJERCICIO 1
function esBisiesto(anio) {
    if (anio % 4 == 0 && (anio % 100 != 0 || anio % 400 == 0)) {
        return "Es bisiesto";
    } else {
        return "No es bisiesto";
    }
}

// EJERCICIO 2
function recuadro(frase) {
    let palabras = frase.split(" ");
    let longitud = 0;

    for (let i = 0; i < palabras.length; i++) {
        if (palabras[i].length > longitud) {
            longitud = palabras[i].length;
        }
    }

    console.log("*".repeat(longitud + 4));

    for (let i = 0; i < palabras.length; i++) {
        console.log(`* ${palabras[i].padEnd(longitud, " ")} *`);
    }

    console.log("*".repeat(longitud + 4));
}
