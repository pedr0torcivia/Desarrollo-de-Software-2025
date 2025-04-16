// Cargar Libreria
const seedrandom = require('seedrandom');

function getAnteultimo(numero) {
    let anteultimoDigito = Math.floor((Math.abs(numero) / 10) % 10);
    return anteultimoDigito;
} 
 
function promedio(cantidad, suma) {
    if (cantidad > 0) {
        return Math.round(suma / cantidad)
    } else {
        return 0
    }
}

function main() {
    // Generador de números
    const random = seedrandom(1763519,  { state: true });

    // Obtención de números
    const cantidad = 1000000;
    const numeros = []; 

    // Generar Array con numeros aleatorios
    for (let i = 0; i < cantidad; i++){
        numeros.push(random.int32())
    }

    // Iniciar variables
    let positivos = 0;
    let negativos = 0;

    let nums0456 = 0;
    let contadores = new Array(10).fill(0);

    let menor = numeros[0] ;  
    let posMenor = 1;

    let cantSignoIgual = 0;

    let sumador6Dig = 0;
    let contador6Dig = 0;

    // Recorrido del array de numeros
    for (let i = 0; i <= numeros.length - 1; i++) {
        // Punto 1 
        if (numeros[i] > 0) {
            positivos++;
        } else {
            negativos++;
        }

        // Punto 2 
        if ((numeros[i] % 7 == 0) || (numeros[i] % 7 == 3) || (numeros[i] % 7 == 5) || (numeros[i] % 7 == 6)) {
            nums0456++;
        }

        // Punto 3
        contadores[getAnteultimo(numeros[i])] += 1;
         
        // Punto 4
        if (menor > numeros[i]) {
            menor = numeros[i]
            posMenor = i + 1; 
        } 

        // Punto 5
        if (i !== 0) {
            if ((numeros[i] > 0 && numeros[i - 1] > 0) || (numeros[i] < 0 && numeros[i - 1] < 0)) {
                cantSignoIgual++;  
            } 
        } 
        
        // Punto 6
        let valorAbs = Math.abs(numeros[i]);
        if (valorAbs >= 100000 && valorAbs <= 999999) {
        sumador6Dig += numeros[i];
        contador6Dig++; 
        } 
    }
    console.log("Positivos:", positivos);
    console.log("Negativos:", negativos);
    console.log("Cantidad %7 == 0,3,5,6:", nums0456);
    console.log("Contadores por anteúltimo dígito:")
    console.table(contadores);
    console.log("Menor número:", menor, "en posición:", posMenor);
    console.log("Cantidad de números con mismo signo que el anterior:", cantSignoIgual);
    console.log("Promedio de números con 6 dígitos:", promedio(contador6Dig, sumador6Dig));
}

main()
