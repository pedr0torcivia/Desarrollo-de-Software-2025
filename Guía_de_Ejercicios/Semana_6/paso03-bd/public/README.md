# Guía de Ejercicios - BiciAlquileres

## 🔰 Planteo Inicial - Sistema de Gestión de BiciAlquileres

Estás trabajando en el desarrollo de una aplicación web de práctica para simular un sistema de alquiler de bicicletas urbanas en la ciudad de Córdoba. Este sistema, llamado **BiciAlquileres**, forma parte de una plataforma educativa con fines formativos, y tiene como objetivo ofrecer a los usuarios:

- Información sobre las estaciones de bicicletas disponibles en la ciudad.
- Un historial visual de sus alquileres realizados.
- La posibilidad de consultar y actualizar sus datos personales.
- Un canal de contacto con soporte técnico y atención al cliente.

La aplicación se desarrolla usando:

- HTML5 semántico para estructurar adecuadamente el contenido.
- Bootstrap 5 (vía CDN) para facilitar el maquetado visual y los estilos.
- Una plantilla base común a todas las páginas (`plantilla.html`) que incluye el header, navbar, footer y el diseño base de la interfaz.

Ya contás con una carpeta base que contiene:

- `index.html` – Landing page principal del sistema.
- `estaciones.html` – Página con listado de estaciones.
- `plantilla.html` – Plantilla general para construir nuevas páginas.

A continuación, deberás completar el desarrollo de tres páginas faltantes siguiendo los lineamientos y requisitos de cada uno de los ejercicios planteados.

---

## 📘 Ejercicio 1: "Mis Datos"

Deberás construir la página `datos.html`, destinada a mostrar los datos personales del usuario logueado. Esta sección representa una vista de perfil común en sistemas de este tipo.

**Requisitos funcionales y estéticos:**

- Foto de perfil destacada alineada a la izquierda superior de la sección principal. Puede ser una imagen de marcador de posición.
- A la derecha de la imagen debe mostrarse el **nombre y apellido**, uno debajo del otro.
- Incluir debajo los siguientes datos del usuario, distribuidos en una sola columna:
  - Correo electrónico.
  - Fecha de nacimiento.
  - Teléfono (con una máscara representativa del formato argentino, por ejemplo: +54 351 123-4567).
- Todos los campos deben estar **bloqueados para edición**.
- Incluir un **botón visible en la parte superior** para simular la acción de "Editar Perfil".
- Utilizar formularios de Bootstrap y clases visuales que garanticen estética y legibilidad.

**Objetivo didáctico:**  
Desarrollar una sección de perfil moderno con Bootstrap, aprovechar componentes de formularios, distribuir contenido de forma fluida y cuidar la alineación semántica entre estructura y propósito visual.

---

## 📗 Ejercicio 2: "Mis Alquileres"

Construí la página `alquileres.html`, que simula la vista del usuario sobre el historial de sus alquileres realizados. Deberás usar HTML5 semántico y Bootstrap reutilizando la plantilla provista.

**Requisitos funcionales y estéticos:**

- Título principal representativo de la sección.
- Formulario de filtros en la parte superior con:
  - Selector de fecha (`input type="date"`) que solo permita elegir fechas en el pasado.
  - Selector por estación (`select`) con todas las estaciones más la opción "Todas".
  - Toggle para incluir alquileres devueltos o en curso.
- Tabla con al menos 7 alquileres simulados que incluya:
  - Fecha y hora de retiro.
  - Estación de retiro.
  - Estación de devolución.
  - Fecha y hora de devolución.
  - Monto pagado.

**Objetivo didáctico:**  
Explorar cómo estructurar contenido dinámico en HTML5, reutilizar componentes de Bootstrap como formularios y tablas, y aplicar criterios de diseño para representar datos históricos de forma clara.

---

## 📕 Ejercicio 3: "Contacto y Soporte Técnico"

Construí la página `contacto.html`, simulando un centro de atención al cliente con un formulario de contacto y ayudas visuales representativas de una aplicación real de alquiler de bicicletas.

**Requisitos funcionales y estéticos:**

- Título general de la sección (ej. "Centro de Contacto y Ayuda").
- Pantalla dividida en dos columnas:
  - **Columna 1:** Tres bloques de ayuda al usuario con íconos Bootstrap como:
    - 🔧 `bi-tools`: problemas técnicos.
    - 🕒 `bi-clock-history`: devolución fuera de tiempo.
    - 📍 `bi-geo-alt`: estaciones llenas o vacías.
  - **Columna 2:** Formulario de contacto con los siguientes campos:
    - Nombre
    - Correo electrónico
    - Teléfono
    - Mensaje
  - Todos los campos con validaciones básicas.
  - Botón "Enviar mensaje".

**Objetivo didáctico:**  
Integrar contenido semántico con diseño orientado al usuario. Usar íconos para reforzar la comunicación visual, practicar validaciones y maquetado en columnas.

---

## 🛠️ Ejercicio Final: Bootstrap Local

Convertí toda la aplicación para que **utilice Bootstrap de forma local**, sin depender del CDN.

**Pasos:**

1. Ingresá al sitio oficial de [Bootstrap 5](https://getbootstrap.com/) y descargá la versión actual.
2. Incorporá la carpeta `css` y `js` de Bootstrap en tu proyecto local.
3. Reemplazá en todas las páginas los enlaces `<link>` y `<script>` que apuntaban al CDN por rutas locales relativas a esos archivos.
4. Usá Live Server para comprobar que la aplicación funciona correctamente sin conexión a internet.

**Objetivo didáctico:**  
Comprender la diferencia entre enlaces remotos y locales, organizar recursos estáticos y familiarizarse con prácticas comunes en entornos reales de desarrollo web.