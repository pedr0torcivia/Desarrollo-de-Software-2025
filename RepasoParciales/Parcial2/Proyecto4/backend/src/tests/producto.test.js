// backend/src/tests/producto.test.js

const request = require('supertest');
const express = require('express');
const app = express();
const sequelize = require('../database/database');
const productoRoutes = require('../routes/producto.routes');

app.use(express.json());
app.use('/api/productos', productoRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true }); // BD limpia para cada test
});

describe('API Productos', () => {
  let idCreado = null;

  test('POST /api/productos → debería crear un producto', async () => {
    const response = await request(app)
      .post('/api/productos')
      .send({
        nombre: 'TestProduct',
        precio: 123.45,
        stock: 10,
        fechaAlta: '2024-01-01'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.nombre).toBe('TestProduct');
    idCreado = response.body.id;
  });

  test('GET /api/productos → debería devolver productos', async () => {
    const response = await request(app).get('/api/productos');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/productos/:id → debería devolver un producto', async () => {
    const response = await request(app).get(`/api/productos/${idCreado}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(idCreado);
  });

  test('PUT /api/productos/:id → debería modificar el producto', async () => {
    const response = await request(app)
      .put(`/api/productos/${idCreado}`)
      .send({ nombre: 'ProductoModificado', precio: 200, stock: 5, fechaAlta: '2024-01-01' });

    expect(response.statusCode).toBe(200);
    expect(response.body[0]).toBe(1); // Sequelize devuelve [1] si 1 fila fue modificada
  });

  test('DELETE /api/productos/:id → debería eliminar el producto', async () => {
    const response = await request(app).delete(`/api/productos/${idCreado}`);
    expect(response.statusCode).toBe(200);
  });
});
