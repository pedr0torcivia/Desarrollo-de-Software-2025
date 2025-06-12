let autosAgencia = [
  { marca: 'Renault', modelo: 'Sandero', anio: 2022, precio: 19000000 },
  { marca: 'Chevrolet', modelo: 'Cruze', anio: 2019, precio: 23000000 },
  { marca: 'Citroen', modelo: 'C3', anio: 2021, precio: 17000000 },
  { marca: 'Fiat', modelo: 'Cronos', anio: 2023, precio: 21500000 }
];

function mostrarAutos() {
  const tablaBody = document.getElementById('tablaAutosBody');
  tablaBody.innerHTML = '';
  autosAgencia.forEach(auto => {
    const fila = `
      <tr>
        <td>${auto.marca}</td>
        <td>${auto.modelo}</td>
        <td>${auto.anio}</td>
        <td>$ ${auto.precio.toLocaleString('es-AR')}</td>
      </tr>
    `;
    tablaBody.innerHTML += fila;
  });
}

function agregarAuto() {
  const marcaInput = document.getElementById('inputMarca');
  const modeloInput = document.getElementById('inputModelo');
  const anioInput = document.getElementById('inputAnio');
  const precioInput = document.getElementById('inputPrecio');

  const marca = marcaInput.value.trim();
  const modelo = modeloInput.value.trim();
  const anioStr = anioInput.value;
  const precioStr = precioInput.value;

  if (!marca || !modelo || !anioStr || !precioStr) {
    alert('Por favor, complete todos los campos.');
    return;
  }

  const anio = parseInt(anioStr);
  const precio = parseFloat(precioStr);

  if (isNaN(anio) || isNaN(precio) || anio <= 1900 || precio < 0) {
    alert('Por favor, ingrese un año y precio válidos.');
    return;
  }

  const nuevoAuto = { marca, modelo, anio, precio };
  autosAgencia.push(nuevoAuto);
  mostrarAutos();

  marcaInput.value = '';
  modeloInput.value = '';
  anioInput.value = '';
  precioInput.value = '';
  marcaInput.focus();
}

function eliminarUltimoAuto() {
  if (autosAgencia.length > 0) {
    autosAgencia.pop();
    mostrarAutos();
  } else {
    alert('No hay autos para eliminar.');
  }
}

document.addEventListener('DOMContentLoaded', mostrarAutos);
document.getElementById('btnAgregar').addEventListener('click', agregarAuto);
document.getElementById('btnEliminarUltimo').addEventListener('click', eliminarUltimoAuto);
