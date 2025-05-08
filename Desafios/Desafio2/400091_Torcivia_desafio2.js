const fs = require('fs');

// Leer y parsear el archivo JSON
const personas = JSON.parse(fs.readFileSync('./personas.json', 'utf-8'));

// 1. Calcular el promedio entero de las edades
const promedioEdad = Math.round(
  personas.reduce((acc, p) => acc + p.edad, 0) / personas.length
);
console.log("1. Promedio edades:", promedioEdad);

// 2. Persona más joven
const masJoven = personas.reduce((min, p) => p.edad < min.edad ? p : min, personas[0]);
console.log("2. Persona más joven:", `${masJoven.nombre} ${masJoven.apellido}`);

// 3. Nombres con apellido GOMEZ desde el primer que empieza con "N"
const gomezOrdenados = personas
  .filter(p => p.apellido === 'GOMEZ')
  .map(p => p.nombre)
  .sort();

const desdeN = gomezOrdenados.filter(n => n >= 'N');
const resultadoDesdeN = desdeN.join(',');

console.log("3. Nombres con GOMEZ desde N:", resultadoDesdeN || "Ninguno");
// 4. Suma de edades con nombre par y apellido impar
const sumaEdades = personas
  .filter(p => p.nombre.length % 2 === 0 && p.apellido.length % 2 === 1)
  .reduce((acc, p) => acc + p.edad, 0);
console.log("4. Suma edades (nombre par, apellido impar):", sumaEdades);

// 5. Objeto con estadísticas de edad y apellido
const menores = personas.filter(p => p.edad <= 18).length;
const mayores = personas.filter(p => p.edad > 18).length;
const primeraMitad = personas.filter(p => p.apellido[0] >= 'A' && p.apellido[0] <= 'L').length;
const segundaMitad = personas.filter(p => p.apellido[0] >= 'M' && p.apellido[0] <= 'Z').length;

const resumen = {
mayores,
  menores,
  primeraMitad,
  segundaMitad
};
console.log("5. Estadísticas edad/apellido:", resumen);

// 6. Conteo de apellidos específicos
const apellidos = ['CASTILLO', 'DIAZ', 'FERRER', 'PINO', 'ROMERO'];
const conteo = {};
for (const apellido of apellidos) {
  conteo[apellido] = personas.filter(p => p.apellido === apellido).length;
}
console.log("6. Conteo apellidos específicos:", conteo);
