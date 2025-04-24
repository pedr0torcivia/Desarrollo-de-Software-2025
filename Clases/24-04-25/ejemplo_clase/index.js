const express = require('express');

// Simulación de base de datos en memoria
const baseDatos = {
    clientes: [
        { id: 1, nombre: 'Cliente 1' },
        { id: 2, nombre: 'Cliente 2' },
        { id: 3, nombre: 'Cliente 3' }
    ],
    proveedores: [
        { id: 1, nombre: 'Proveedor 1' },
        { id: 2, nombre: 'Proveedor 2' },
        { id: 3, nombre: 'Proveedor 3' }
    ],
    articulos: [
        { id: 1, nombre: 'Artículo 1', precio: 100 },
        { id: 2, nombre: 'Artículo 2', precio: 200 },
        { id: 3, nombre: 'Artículo 3', precio: 300 }
    ]
};

// Función que crea una aplicación Express con rutas
const createApp = () => {
    const app = express();

    // Middleware para procesar JSON en el body
    app.use(express.json());

    // Ruta raíz de prueba
    app.get('/', (req, res) => {
        res.send('API activa');
    });

    // GET /clientes con soporte para ?nombre=
    app.get('/clientes', (req, res) => {
        const nombre = req.query.nombre;
        let resultado = baseDatos.clientes;

        if (nombre) {
            resultado = resultado.filter(c =>
                c.nombre.toLowerCase().includes(nombre.toLowerCase())
            );
        }

        res.json(resultado);
    });

    // GET /clientes/:id
    app.get('/clientes/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const cliente = baseDatos.clientes.find(c => c.id === id);

        if (cliente) {
            res.json(cliente);
        } else {
            res.status(404).send('Cliente no encontrado');
        }
    });

    // POST /clientes
    app.post('/clientes', (req, res) => {
        const { nombre } = req.body;

        if (!nombre) {
            return res.status(400).send('El campo "nombre" es obligatorio');
        }

        const nuevoCliente = {
            id: baseDatos.clientes.length + 1,
            nombre
        };

        baseDatos.clientes.push(nuevoCliente);
        res.status(201).json(nuevoCliente);
    });

    // GET /proveedores
    app.get('/proveedores', (req, res) => {
        res.json(baseDatos.proveedores);
    });

    // GET /articulos
    app.get('/articulos', (req, res) => {
        res.json(baseDatos.articulos);
    });

    // Ruta para cualquier otro endpoint no definido
    app.use((req, res) => {
        res.status(404).send('Ruta no encontrada');
    });

    return app;
};

// Crear la app principal directamente
const app = createApp();

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
