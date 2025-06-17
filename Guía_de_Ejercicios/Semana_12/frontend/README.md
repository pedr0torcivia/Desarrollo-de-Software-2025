# Paso 5 - React Evolutivo con Componentes + Maquetado Real

Este paso representa la transición desde el **Paso 4** (estructura por componentes simples + JSX declarativo) hacia una primera versión realista del sistema **BiciAlquileres**, incorporando:

- Maquetado visual completo de la página de **Inicio**
- Uso de **CSS modular por componente**
- Inclusión de **Bootstrap** y **Bootstrap Icons** por CDN
- Estructura semántica HTML5 respetada
- Sin props, hooks ni routing aún (a introducir en pasos futuros). A continuación se detalla la agenda de trabajo que se llevó a cabo para lograr esta transición:

## 🔄 Transición del Paso 4 al Paso 5: Pasos detallados

**🧩 Paso 1: Preparar assets estáticos**
📁 Copiar a src/ dentro del proyecto React:

```bash
/images        →  src/assets/images
/css           →  src/assets/css

```

**🧱 Paso 2: Crear nuevos componentes React**
Convertimos la estructura de index.html y contacto.html de la maqueta en componentes funcionales. Por ejemplo:

- Inicio.jsx

También se mantendrán componentes comunes como:

- Encabezado.jsx
  - Adaptación de `Encabezado.jsx` para incluir pills de navegación estáticos (`href="#"`).
- PiePagina.jsx

> Creación de la carpeta `pages/` y del componente `Inicio.jsx` con su CSS asociado `Inicio.css`.

**🧾 Paso 4: Modificar `index.html`, `main.js`, `App.jsx` y aplicar Bootstrap**  

1. Incorporación manual de Bootstrap 5 y Bootstrap Icons por CDN en `index.html`.
2. Importación de `bicialquileres.css` como estilo global desde `main.jsx`.
3. Conversión de clases HTML (`class`) a `className` en JSX.

**Test visual progresivo hasta alcanzar la fidelidad con el maquetado inicial.**

## ✅ Resumen: Cambios desde el Paso 4

| Archivo                         | Cambio principal                                                 |
| ------------------------------- | ---------------------------------------------------------------- |
| `App.jsx`                       | Renderiza solo `<Inicio />` + `<Encabezado />` y `<PiePagina />` |
| `main.jsx`                      | Importa `bicialquileres.css` como estilo global                  |
| `index.html`                    | Agrega Bootstrap 5 y Bootstrap Icons por CDN                     |
| `src/pages/Inicio.jsx`          | Nueva versión con cards y llamado a la acción                    |
| `src/pages/Inicio.css`          | Estilos específicos del componente `Inicio`                      |
| `src/components/Encabezado.jsx` | Navbar con estructura semántica + pills estáticos (`href="#"`)   |
| `src/components/PiePagina.jsx`  | Footer semántico y centrado                                      |

---

## 🎨 Inclusión de estilos y recursos

### 🔹 Bootstrap por CDN

En `index.html`:

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
```

### 👤 Bootstrap Icons por CDN

```html
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
/>
```

### 📅 Estilos personalizados

En `main.jsx`:

```js
import './assets/css/bicialquileres.css';
```

Y en `Inicio.jsx`:

```js
import './Inicio.css';
```

---

## 📂 Estructura final de `src`

```bash
src/
├── App.jsx
├── main.jsx
├── assets/
│   └── css/
│       └── bicialquileres.css
├── components/
│   ├── Encabezado.jsx
│   └── PiePagina.jsx
├── pages/
│   ├── Inicio.jsx
│   └── Inicio.css
```

---

## 📚 Buenas prácticas aplicadas

- `class` → `className` en todos los elementos JSX
- Iconos `bi bi-*` mostrados correctamente tras importar la fuente
- `Inicio.jsx` usa `<main>` y `<section>` semánticos
- Componentes separados por responsabilidad (cabecera, contenido, pie)
- `href="#"` en pills para evitar errores antes de usar `react-router-dom`

---

## ✨ Resultado visual esperado

- Navbar con logo y links "Inicio", "Estaciones", "Alquileres", "Contacto"
- Cards de beneficios (ecológico, saludable, conveniente)
- Botón de acción grande debajo de las cards
- Footer con texto institucional centrado

---

## ℹ️ Observaciones

- Este paso es 100% **visual y declarativo**.
- Todavía no hay props, estado (`useState`) ni navegación.
- Es ideal para consolidar JSX, Bootstrap y estructura por componentes.

---

¡Listo! Con esto el proyecto BiciAlquileres ya empieza a parecer una app real, modular y mantenible ✨
