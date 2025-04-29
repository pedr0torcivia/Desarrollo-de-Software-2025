# Paso 03

## Acceso a Base de Datos con Sequelize y SQLite

En este paso se reemplaza el vector en memoria de barrios por una **base de datos real con SQLite** utilizando el ORM **Sequelize**.  
Esto permite cerrar el ciclo completo:  
**base de datos → backend → frontend dinámico**

---

## 📁 Estructura del proyecto

```
paso03-bd/
├── app.js                      # Backend con ruta /api/barrios actualizada a DB real
├── db.js                       # Configuración de Sequelize + SQLite
├── models/barrio.js            # Modelo Barrio en estilo clase ES6
├── data/db.sqlite              # Archivo físico de la base de datos
├── public/                     # Maquetado HTML con JS conectado al backend
│   ├── estaciones.html
│   ├── js/bicialquileres.js
│   └── ...
└── test.rest                   # Pruebas de la API
```

---

## ⚙️ ¿Qué se configuró?

### ✅ Sequelize (ORM)

Se define la conexión a la base SQLite:

```js
// db.js
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './data/db.sqlite'
});
```

---

### ✅ Modelo `Barrio`

Se define con validaciones y restricciones:

```js
class Barrio extends Model {}

Barrio.init({
  idBarrio: {
    type: DataTypes.INTEGER,
    field: 'ID_BARRIO',
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    field: 'NOMBRE',
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 100]
    }
  }
}, {
  sequelize,
  modelName: 'Barrio',
  tableName: 'BARRIOS',
  timestamps: false
});
```

---

## 📡 `/api/barrios` ahora consulta desde la base

```js
const rowBarrios = await Barrio.findAll({
  order: [["nombre", "ASC"]]
});
```

Y retorna los datos reales almacenados en `db.sqlite`.

---

## 🧪 Prueba con REST Client

```http
### Obtener barrios desde base de datos
GET http://localhost:3000/api/barrios
Accept: application/json
```

---

## 🧠 ¿Qué aprendimos en este paso?

- Cómo configurar Sequelize y conectar con una base SQLite
- Cómo definir un modelo usando clases ES6
- Cómo consultar una tabla desde el backend usando `.findAll()`
- Cómo mantener el frontend funcionando sin modificarlo (el `fetch` sigue intacto)

---

✅ ¡A partir de aquí ya podés modelar nuevas tablas como estaciones y establecer relaciones!
