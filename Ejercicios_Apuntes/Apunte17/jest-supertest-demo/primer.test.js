import sumar, { cuentaLetras } from "./index.js";

test("suma dos números", () => {
  expect(sumar(1, 2)).toBe(3);
});

test("cuenta letras", () => {
  expect(cuentaLetras("importante")).toBe(10);
});
