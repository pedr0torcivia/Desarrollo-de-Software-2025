// app.test.js
import request from "supertest";
import app from "./app.js";

test("GET /saludo debe responder con un JSON y status 200", async () => {
  const res = await request(app).get("/saludo");

  expect(res.statusCode).toBe(200);
  expect(res.headers["content-type"]).toMatch(/json/);
  expect(res.body).toEqual({ mensaje: "Hola Galactus" });
});
