const seedrandom = require('seedrandom');
const rng = seedrandom('1763519'); // Semilla definida

const numeros = [];
const resultados = {
    positivos: 0,
    negativos: 0,
    multiplosDe7: [0, 0, 0, 0], // Para contar los restos 0, 3, 5, 6
    decenas: Array(10).fill(0), // Arreglo para los contadores de decenas
    menor: { valor: Number.MAX_SAFE_INTEGER, posicion: -1 },
    mismoSignoQueAnterior: 0,
    promedioSeisDigitos: 0
};

let sumaSeisDigitos = 0;
let contadorSeisDigitos = 0;

console.log('Iniciando la generación de números aleatorios y cálculos...');

for (let i = 0; i < 1000000; i++) {
    const num = rng.int32();
    numeros.push(num);

    // Cantidad de números positivos y negativos
    if (num >= 0) resultados.positivos++;
    else resultados.negativos++;

    // Resto de la división por 7
    const resto = Math.abs(num % 7);
    if ([0, 3, 5, 6].includes(resto)) resultados.multiplosDe7[[0, 3, 5, 6].indexOf(resto)]++;

    // Contador por decenas (anteúltimo dígito)
    const decenas = Math.floor(Math.abs(num) / 10) % 10;
    resultados.decenas[decenas]++;

    // Encontrar el menor número
    if (num < resultados.menor.valor) {
        resultados.menor.valor = num;
        resultados.menor.posicion = i + 1; // La posición empieza en 1
    }

    // Cantidad de números con el mismo signo que el anterior
    if (i > 0 && Math.sign(num) === Math.sign(numeros[i - 1])) {
        resultados.mismoSignoQueAnterior++;
    }

    // Promedio de números con 6 dígitos
    if (Math.abs(num) >= 100000 && Math.abs(num) <= 999999) {
        sumaSeisDigitos += num;
        contadorSeisDigitos++;
    }
}

// Calcular el promedio
if (contadorSeisDigitos > 0) {
    resultados.promedioSeisDigitos = Math.round(sumaSeisDigitos / contadorSeisDigitos);
}

// Imprimir resultados en consola
console.log('Cantidad de números positivos:', resultados.positivos);
console.log('Cantidad de números negativos:', resultados.negativos);
console.log('Multiplos de 7 con restos [0, 3, 5, 6]:', resultados.multiplosDe7);
console.log('Contadores por decenas (anteúltimo dígito):', resultados.decenas);
console.log('Menor número generado:', resultados.menor);
console.log('Cantidad de números con el mismo signo que el anterior:', resultados.mismoSignoQueAnterior);
console.log('Promedio de números con 6 dígitos:', resultados.promedioSeisDigitos);