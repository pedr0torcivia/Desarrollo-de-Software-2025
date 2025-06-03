document.addEventListener('DOMContentLoaded', () => {
  cargarLocales();

  document.getElementById('btnFiltrar').addEventListener('click', () => {
    const texto = document.getElementById('filtroTexto').value;
    const hemisferio = document.getElementById('filtroHemisferio').value;
    cargarLocales(texto, hemisferio);
  });
});

async function cargarLocales(texto = '', hemisferio = 'Todos') {
  let url = '/api/locales';
  const params = [];

  if (texto) params.push(`texto=${encodeURIComponent(texto)}`);
  if (hemisferio && hemisferio !== 'Todos') params.push(`hemisferio=${hemisferio}`);
  if (params.length > 0) url += '?' + params.join('&');

  try {
    const res = await fetch(url);
    const datos = await res.json();
    renderTabla(datos);
  } catch (error) {
    console.error('Error al cargar locales:', error);
  }
}

function renderTabla(locales) {
  const tbody = document.getElementById('bodyTablaLocales');
  tbody.innerHTML = '';

  locales.forEach(local => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${local.nombre}</td>
      <td>${local.direccion}</td>
      <td>${local.ciudad}</td>
      <td>${local.pais}</td>
      <td>${local.hemisferio}</td>
    `;
    tbody.appendChild(fila);
  });
}
