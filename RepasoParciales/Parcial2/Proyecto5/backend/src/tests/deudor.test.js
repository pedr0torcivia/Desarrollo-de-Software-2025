const request = require('supertest');
const express = require('express');
const cors = require('cors');
const sequelize = require('../database/database');
const deudorRoutes = require('../routes/deudor.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', deudorRoutes);

// Antes de correr los tests: sincronizar BD en memoria
beforeAll(async () => {
  await sequelize.sync({ force: true }); // limpiar datos anteriores
});

describe('API /api/deudores', () => {

  it('POST /deudores → debe crear un nuevo deudor', async () => {
    const nuevo = {
      nombreCompleto: 'Test Deudor',
      importe: 1000,
      fechaDeuda: '2024-06-01',
      fechaLimitePago: '2024-06-30'
    };

    const res = await request(app).post('/api/deudores').send(nuevo);
    expect(res.statusCode).toBe(201);
    expect(res.body.nombreCompleto).toBe(nuevo.nombreCompleto);
  });

  it('GET /deudores → debe devolver lista de deudores', async () => {
    const res = await request(app).get('/api/deudores');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  it('POST /deudores → error si falta campo requerido', async () => {
    const res = await request(app).post('/api/deudores').send({
      nombreCompleto: '',
      importe: null
    });
    expect(res.statusCode).toBe(400);
  });

});
