document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const salida = document.getElementById('salida');
  const btnArticulos = document.getElementById('btnArticulos');
  let token = '';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value;
    const clave = document.getElementById('clave').value;

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, clave })
    });

    const data = await res.json();
    if (res.ok) {
      token = data.token;
      salida.textContent = 'Login correcto. Token guardado.';
    } else {
      salida.textContent = data.mensaje || 'Error de login.';
    }
  });

  btnArticulos.addEventListener('click', async () => {
    if (!token) return salida.textContent = '⚠️ Primero iniciá sesión';

    const res = await fetch('/api/jwt/articulos', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await res.json();
    salida.textContent = JSON.stringify(data, null, 2);
  });
});
