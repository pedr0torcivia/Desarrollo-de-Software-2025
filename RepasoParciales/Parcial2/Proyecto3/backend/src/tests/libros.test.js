const request = require('supertest');
const express = require('express');
const app = express();
const librosRouter = require('../routes/libros.routes');
const sequelize = require('../database/database');
require('../models/Libro');

app.use(express.json());
app.use('/api/libros', librosRouter);

beforeAll(async () => {
  await sequelize.sync();
});

describe('API Libros', () => {
  let idNuevo = null;

  it('GET /api/libros debería devolver lista de libros', async () => {
    const res = await request(app).get('/api/libros');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/libros debería crear un nuevo libro', async () => {
    const nuevo = {
      Titulo: 'Test Book',
      Autor: 'Tito GpT',
      AnioPublicacion: 2024
    };

    const res = await request(app).post('/api/libros').send(nuevo);
    expect(res.statusCode).toBe(201);
    expect(res.body.Titulo).toBe('Test Book');
    idNuevo = res.body.IdLibro; // guardamos ID para test de PUT/DELETE
  });

  it('GET /api/libros?search=Test debería filtrar por título', async () => {
    const res = await request(app).get('/api/libros?search=Test');
    expect(res.statusCode).toBe(200);
    expect(res.body.some(b => b.Titulo.includes('Test'))).toBe(true);
  });

  it('PUT /api/libros/:id debería modificar un libro existente', async () => {
    const res = await request(app).put(`/api/libros/${idNuevo}`).send({
      Titulo: 'Test Book Editado',
      Autor: 'Galactus',
      AnioPublicacion: 2025
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.Titulo).toBe('Test Book Editado');
  });

  it('DELETE /api/libros/:id debería eliminar el libro', async () => {
    const res = await request(app).delete(`/api/libros/${idNuevo}`);
    expect(res.statusCode).toBe(204);
  });

  it('GET /api/libros/:id eliminado debería dar 404', async () => {
    const res = await request(app).get(`/api/libros/${idNuevo}`);
    expect(res.statusCode).toBe(404);
  });
});
