// primer.test.js
import sumar, { cuentaLetras } from "./index.js";

// Test de suma
test("sumar() debe retornar la suma de dos números", () => {
  const resultado = sumar(2, 3);
  expect(resultado).toBe(5);
});

// Test de cuenta de letras
test("cuentaLetras() debe contar correctamente los caracteres de una palabra", () => {
  const resultado = cuentaLetras("Galactus");
  expect(resultado).toBe(8); // "Galactus" tiene 8 letras
});
