# API Backend paso a paso

## Proyecto BiciAlquileres

Este repositorio contiene una **evolución progresiva** de una API Backend desarrollada con **Node.js + Express** y, más adelante, integrada con una **base de datos SQLite3** utilizando **Sequelize** como ORM.

El proyecto está enfocado en la enseñanza paso a paso del desarrollo backend para estudiantes, conectando progresivamente los conceptos fundamentales de HTTP, rutas, APIs REST, y acceso a base de datos.

---

## 🎯 Objetivo general

- Entender cómo se construye un backend desde cero
- Conectar ese backend con un frontend HTML estático
- Introducir el acceso a bases de datos y el uso de un ORM moderno
- Preparar el terreno para desarrollar un backend completo sobre el dominio **BiciAlquileres**

---

## 📦 Contenido del repositorio

Cada paso tiene su carpeta correspondiente con el código fuente completo y su propio `README.md` explicativo.

### 🔹 [`paso01-start`](./paso01-start)

> ✅ Primer servidor Express con rutas básicas

- Configuración mínima de Express
- Endpoint `/health-check` que devuelve un estado "ok"
- Endpoint `/echo?mensaje=algo` que repite el mensaje recibido
- Respuesta HTML sencilla desde `/` para probar que el servidor funciona

📘 Ideal para introducir conceptos como verbos HTTP, status codes y estructura básica de una API.

---

### 🔹 [`paso02-back&front`](./paso02-back&front)

> 🔁 Integramos el backend con un frontend estático

- Se agrega la carpeta `public/` con HTML y JS (maquetado de estaciones)
- Se crea un endpoint `/api/barrios` que devuelve un array simulado en memoria
- El HTML carga dinámicamente las opciones del `<select>` usando `fetch()`

📘 Este paso introduce la idea de “consumir datos del backend” desde el cliente.

---

### 🔹 [`paso03-bd`](./paso03-bd)

> 🧠 Persistencia real con base de datos

- Se agrega configuración de Sequelize con SQLite
- Se define el modelo `Barrio` como clase
- Se reemplaza el vector en memoria por datos reales desde la tabla `BARRIOS`
- El endpoint `/api/barrios` ahora consulta directamente la base de datos

📘 Cierra el ciclo real: **BD → backend → frontend**

---

## 📚 ¿Qué sigue?

La continuidad de este trabajo se realiza a través de una **guía de ejercicios** que propone nuevos desafíos sobre esta base:

- Crear el modelo `Estacion`
- Implementar nuevos endpoints RESTful
- Agregar filtros y búsquedas
- Vincular todo al frontend de forma dinámica
