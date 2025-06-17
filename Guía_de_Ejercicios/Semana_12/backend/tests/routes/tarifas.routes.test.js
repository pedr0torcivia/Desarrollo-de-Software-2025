import request from "supertest";
import express from "express";
import TarifaService from "../../services/tarifaService.js";
import tarifasRouter from "../../routers/tarifas.routes.js";
import { jest } from "@jest/globals";
import { describe, it, expect, afterEach } from "@jest/globals";

jest.mock("../../services/tarifaService.js");
TarifaService.buscarPorSemana = jest.fn();
TarifaService.buscarPorFecha = jest.fn();
TarifaService.listar = jest.fn();
TarifaService.obtenerPorId = jest.fn();

const app = express();
app.use(express.json());
app.use("/tarifas", tarifasRouter);

describe("Tarifas Routes", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /tarifas", () => {
    it("deberÃ­a retornar todas las tarifas paginadas", async () => {
      const mockResponse = [{ idTarifa: 1, descripcion: "Tarifa Test" }];
      TarifaService.listar.mockResolvedValue(mockResponse);

      const response = await request(app).get("/tarifas");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockResponse);
    });
  });

  describe("GET /tarifas/:id", () => {
    it("deberÃ­a retornar tarifa por ID", async () => {
      const mockTarifa = { idTarifa: 1, descripcion: "Tarifa Test" };
      TarifaService.obtenerPorId.mockResolvedValue(mockTarifa);

      const response = await request(app).get("/tarifas/1");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTarifa);
    });

    it("deberÃ­a devolver 400 si el ID no es vÃ¡lido", async () => {
      const response = await request(app).get("/tarifas/abc");
      expect(response.status).toBe(400);
    });

    it("deberÃ­a devolver 404 si no se encuentra la tarifa", async () => {
      TarifaService.obtenerPorId.mockRejectedValue({ status: 404, message: "Tarifa no encontrada" });

      const response = await request(app).get("/tarifas/999");

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: "Tarifa no encontrada" });
    });
  });

  describe("GET /tarifas/semana/:diaSemana", () => {
    it("deberÃ­a retornar tarifas semanales", async () => {
      const tarifas = [{ idTarifa: 1, diaSemana: 2 }];
      TarifaService.buscarPorSemana.mockResolvedValue(tarifas);

      const response = await request(app).get("/tarifas/semana/2");

      expect(response.status).toBe(200);
      expect(response.body).toEqual(tarifas);
    });
  });

  describe("GET /tarifas/fecha", () => {
    it("deberÃ­a retornar tarifas por fecha", async () => {
      const tarifas = [{ idTarifa: 1, diaMes: 1, mes: 6, anio: 2024 }];
      TarifaService.buscarPorFecha.mockResolvedValue(tarifas);

      const response = await request(app)
        .get("/tarifas/fecha")
        .query({ dia: 1, mes: 6, anio: 2024 });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(tarifas);
    });
  });
});

describe("POST /tarifas", () => {
    it("deberÃ­a crear una nueva tarifa vÃ¡lida", async () => {
      const nuevaTarifa = {
        descripcion: "Tarifa Especial",
        tipoTarifa: 1,
        definicion: "S",
        diaSemana: 3,
        montoFijoAlquiler: 100,
        montoMinutoFraccion: 1,
        montoHora: 20,
        montoKm: 5
      };
      TarifaService.crear = jest.fn().mockResolvedValue({ idTarifa: 10, ...nuevaTarifa });

      const response = await request(app).post("/tarifas").send(nuevaTarifa);

      expect(response.status).toBe(201);
      expect(response.body.descripcion).toBe("Tarifa Especial");
    });

    it("deberÃ­a devolver 409 si ya existe tarifa del mismo tipo para ese dÃ­a", async () => {
      TarifaService.crear = jest.fn().mockRejectedValue({ status: 409, message: "Ya existe una tarifa del mismo tipo para ese dÃ­a" });

      const response = await request(app).post("/tarifas").send({
        descripcion: "Duplicada",
        tipoTarifa: 1,
        definicion: "S",
        diaSemana: 1
      });

      expect(response.status).toBe(409);
      expect(response.body.error).toBe("Ya existe una tarifa del mismo tipo para ese dÃ­a");
    });
  });

  describe("PUT /tarifas/:id", () => {
    it("deberÃ­a actualizar una tarifa existente", async () => {
      const datosActualizados = {
        descripcion: "Tarifa Actualizada",
        tipoTarifa: 2,
        definicion: "C",
        diaMes: 1,
        mes: 1,
        anio: 2025
      };
      TarifaService.actualizar = jest.fn().mockResolvedValue({ idTarifa: 1, ...datosActualizados });

      const response = await request(app).put("/tarifas/1").send(datosActualizados);

      expect(response.status).toBe(200);
      expect(response.body.descripcion).toBe("Tarifa Actualizada");
    });

    it("deberÃ­a devolver 404 si no existe la tarifa", async () => {
      TarifaService.actualizar = jest.fn().mockRejectedValue({ status: 404, message: "Tarifa no encontrada" });

      const response = await request(app).put("/tarifas/999").send({ descripcion: "Inexistente" });

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Tarifa no encontrada");
    });
  });

  describe("DELETE /tarifas/:id", () => {
    it("deberÃ­a eliminar una tarifa existente", async () => {
      TarifaService.eliminar = jest.fn().mockResolvedValue(true);

      const response = await request(app).delete("/tarifas/1");

      expect(response.status).toBe(204);
    });

    it("deberÃ­a devolver 404 si la tarifa no existe", async () => {
      TarifaService.eliminar = jest.fn().mockRejectedValue({ status: 404, message: "Tarifa no encontrada" });

      const response = await request(app).delete("/tarifas/999");

      expect(response.status).toBe(404);
      expect(response.body.error).toBe("Tarifa no encontrada");
    });
  });