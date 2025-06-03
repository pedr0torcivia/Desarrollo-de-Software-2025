import request from 'supertest';

test("API externa devuelve imagen de perro", async () => {
  const res = await request("https://dog.ceo").get("/api/breeds/image/random");
  expect(res.statusCode).toBe(200);
  expect(res.headers['content-type']).toMatch(/json/);
});
