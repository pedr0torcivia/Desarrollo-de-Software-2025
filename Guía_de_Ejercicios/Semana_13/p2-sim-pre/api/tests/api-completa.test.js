import request from "supertest";
import app from "../app.js";
import sequelize from "../db.js";
import Plataforma from "../models/plataforma.js";

describe("🧪 API COMPLETA - Pruebas funcionales", () => {
  let juegoId = null;
  const nombreUnico = "Juego Test " + Date.now();

  beforeAll(async () => {
    const plataforma = await Plataforma.findByPk(1);
    if (!plataforma) {
      await Plataforma.create({ id: 1, nombre: "PC" });
    }
  });

  test("✅ Crear juego", async () => {
    const res = await request(app)
      .post("/api/juegos")
      .send({
        nombre: nombreUnico,
        fechaEstreno: Date.now(),
        urlWeb: "https://test.com",
        genero: "Acción",
        dearrollador: "Dev Studio",
        valoracion: 90,
        opiniones: 600,
        codigoEsrb: "T",
        idPlataforma: 1
      });

    expect([200, 201]).toContain(res.status);
    expect(res.body.nombre).toBe(nombreUnico);
    juegoId = res.body.id;
    expect(juegoId).toBeDefined();
  });

  test("❌ Nombre duplicado da error 400", async () => {
    const res = await request(app)
      .post("/api/juegos")
      .send({
        nombre: nombreUnico,
        fechaEstreno: Date.now(),
        urlWeb: "",
        genero: "RPG",
        dearrollador: "Otro",
        valoracion: 80,
        opiniones: 500,
        codigoEsrb: "M",
        idPlataforma: 1
      });

    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  test("✅ Listado paginado", async () => {
    const res = await request(app)
      .get("/api/juegos?pagina=1&limite=10");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("✅ Modificar juego", async () => {
    if (!juegoId) return console.warn("⚠️ ID nulo, se salta PUT");
    const res = await request(app)
      .put(`/api/juegos/${juegoId}`)
      .send({
        nombre: nombreUnico + " v2",
        idPlataforma: 1,
        codigoEsrb: "T",
        dearrollador: "Modificado"
      });

    expect(res.status).toBe(200);
    expect(res.body.nombre).toContain("v2");
  });

  test("✅ Listado POPULARES", async () => {
    const res = await request(app)
      .get("/api/juegos/top/populares");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("✅ Listado ÚLTIMOS ESTRENOS", async () => {
    const res = await request(app)
      .get("/api/juegos/top/ultimos");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("✅ Filtro avanzado", async () => {
    const res = await request(app)
      .get(`/api/juegos/filtrar?texto=v2&codigoEsrb=T`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("✅ Conteo de coincidencias", async () => {
    const res = await request(app)
      .get(`/api/juegos/filtrar/contar?texto=v2`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("cantidad");
    expect(typeof res.body.cantidad).toBe("number");
  });

  test("✅ Listado de plataformas", async () => {
    const res = await request(app)
      .get("/api/plataformas");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("✅ Eliminar juego", async () => {
    if (!juegoId) return console.warn("⚠️ ID nulo, se salta DELETE");

    const res = await request(app)
      .delete(`/api/juegos/${juegoId}`);
    expect([200, 204]).toContain(res.status);
  });
});
