import TarifaService from "../../services/tarifaService.js";
import tarifaRepository from "../../repositories/tarifaRepository.js";
import { jest } from "@jest/globals";
import { describe, it, expect, afterEach } from "@jest/globals";

jest.mock("../../repositories/tarifaRepository.js");

describe("TarifaService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("buscarPorSemana", () => {
    it("deberÃ­a retornar tarifas por dÃ­a de semana", async () => {
      const mockResponse = [{ idTarifa: 1, diaSemana: 2 }];
      tarifaRepository.buscarPorSemana.mockResolvedValue(mockResponse);

      const result = await TarifaService.buscarPorSemana(2, -1);

      expect(tarifaRepository.buscarPorSemana).toHaveBeenCalledWith({ diaSemana: 2, tipoTarifa: -1 });
      expect(result).toEqual(mockResponse);
    });

    it("deberÃ­a lanzar error si dÃ­a de semana es invÃ¡lido", async () => {
      await expect(TarifaService.buscarPorSemana(10)).rejects.toThrow("DÃ­a de la semana invÃ¡lido");
    });
  });

  describe("buscarPorFecha", () => {
    it("deberÃ­a retornar tarifas por fecha exacta", async () => {
      const mockResponse = [{ idTarifa: 1, diaMes: 1, mes: 6, anio: 2024 }];
      tarifaRepository.buscarPorFecha.mockResolvedValue(mockResponse);

      const result = await TarifaService.buscarPorFecha(1, 6, 2024, -1);

      expect(result).toEqual(mockResponse);
    });

    it("deberÃ­a lanzar error si fecha es invÃ¡lida", async () => {
      await expect(TarifaService.buscarPorFecha(32, 13, 1999)).rejects.toThrow("Fecha invÃ¡lida");
    });
  });
});