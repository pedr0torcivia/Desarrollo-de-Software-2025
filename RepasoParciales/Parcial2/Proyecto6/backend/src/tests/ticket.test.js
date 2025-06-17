// backend/src/tests/ticket.test.js
const request = require('supertest');
const express = require('express');
const sequelize = require('../database/database');
const ticketRoutes = require('../routes/tickets.routes');

// ⚙️ Crear instancia de app de prueba
const app = express();
app.use(express.json());
app.use(ticketRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true }); // 🔄 Limpiamos la DB antes de testear
});

describe('API /api/tickets', () => {
  test('GET /api/tickets debería devolver un array vacío inicialmente', async () => {
    const res = await request(app).get('/api/tickets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test('POST /api/tickets debería crear un nuevo ticket', async () => {
    const nuevoTicket = {
      nombreTarea: 'Revisar impresora',
      fecha: '2025-06-17',
      prioridad: 5
    };

    const res = await request(app).post('/api/tickets').send(nuevoTicket);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('idTicket');
    expect(res.body.nombreTarea).toBe('Revisar impresora');
  });

  test('GET /api/tickets debería devolver 1 ticket luego del POST', async () => {
    const res = await request(app).get('/api/tickets');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty('nombreTarea', 'Revisar impresora');
  });

  test('POST /api/tickets con datos inválidos debería fallar', async () => {
    const res = await request(app).post('/api/tickets').send({
      nombreTarea: '', // inválido
      fecha: '2025-06-17',
      prioridad: 15 // fuera de rango
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
