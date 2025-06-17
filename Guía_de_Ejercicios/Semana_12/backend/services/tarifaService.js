import tarifaRepository from "../repositories/tarifaRepository.js";
import HttpError from "../util/HttpError.js";

class TarifaService {
  static async listar({ pagina = 1, limite = 10 } = {}) {
    return tarifaRepository.obtenerTodos({ pagina, limite });
  }

  static async obtenerPorId(id) {
    const tarifa = await tarifaRepository.obtenerPorId(id);
    if (!tarifa) throw new HttpError(404, "Tarifa no encontrada");
    return tarifa;
  }

  static async buscarPorSemana(diaSemana, tipoTarifa) {
    if (diaSemana < 1 || diaSemana > 7)
      throw new HttpError(400, "Día de la semana inválido");
    return tarifaRepository.buscarPorSemana({ diaSemana, tipoTarifa });
  }

  static async buscarPorFecha(dia, mes, anio, tipoTarifa) {
    if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || anio < 2000)
      throw new HttpError(400, "Fecha inválida");
    return tarifaRepository.buscarPorFecha({ dia, mes, anio, tipoTarifa });
  }

  static async crear(datos) {
    const {
      descripcion,
      tipoTarifa,
      definicion,
      diaSemana,
      diaMes,
      mes,
      anio,
      montoFijoAlquiler,
      montoMinutoFraccion,
      montoHora,
      montoKm
    } = datos;

    if (!descripcion || descripcion.trim() === "")
      throw new HttpError(400, "Descripción obligatoria");

    if (![1, 2].includes(tipoTarifa))
      throw new HttpError(400, "Tipo de tarifa inválido");

    if (!["S", "C"].includes(definicion))
      throw new HttpError(400, "Definición inválida");

    if (definicion === "S") {
      if (diaSemana < 1 || diaSemana > 7)
        throw new HttpError(400, "Día de la semana inválido");

      if (diaMes || mes || anio)
        throw new HttpError(400, "No debe incluir fecha si definición es 'S'");

      const existente = await tarifaRepository.buscarPorSemana({ diaSemana, tipoTarifa });
      if (existente) throw new HttpError(409, "Ya existe una tarifa del mismo tipo para ese día");
    }

    if (definicion === "C") {
      if (!diaMes || !mes || !anio)
        throw new HttpError(400, "Debe especificar día, mes y año si definición es 'C'");

      if (diaSemana)
        throw new HttpError(400, "No debe incluir díaSemana si definición es 'C'");

      const existente = await tarifaRepository.buscarPorFecha({ dia: diaMes, mes, anio, tipoTarifa });
      if (existente) throw new HttpError(409, "Ya existe una tarifa del mismo tipo para esa fecha");
    }

    const montos = [montoFijoAlquiler, montoMinutoFraccion, montoHora, montoKm];
    if (montos.some(m => m < 0))
      throw new HttpError(400, "Los montos no pueden ser negativos");

    return tarifaRepository.crear(datos);
  }

  static async actualizar(id, datos) {
    const tarifa = await tarifaRepository.obtenerPorId(id);
    if (!tarifa) throw new HttpError(404, "Tarifa no encontrada");

    const {
      descripcion,
      tipoTarifa,
      definicion,
      diaSemana,
      diaMes,
      mes,
      anio,
      montoFijoAlquiler,
      montoMinutoFraccion,
      montoHora,
      montoKm
    } = datos;

    if (!descripcion || descripcion.trim() === "")
      throw new HttpError(400, "Descripción obligatoria");

    if (![1, 2].includes(tipoTarifa))
      throw new HttpError(400, "Tipo de tarifa inválido");

    if (!["S", "C"].includes(definicion))
      throw new HttpError(400, "Definición inválida");

    if (definicion === "S") {
      if (diaSemana < 1 || diaSemana > 7)
        throw new HttpError(400, "Día de la semana inválido");

      if (diaMes || mes || anio)
        throw new HttpError(400, "No debe incluir fecha si definición es 'S'");

      const existente = await tarifaRepository.buscarPorSemana({ diaSemana, tipoTarifa });
      if (existente && existente.id !== id)
        throw new HttpError(409, "Ya existe una tarifa del mismo tipo para ese día");
    }

    if (definicion === "C") {
      if (!diaMes || !mes || !anio)
        throw new HttpError(400, "Debe especificar día, mes y año si definición es 'C'");

      if (diaSemana)
        throw new HttpError(400, "No debe incluir díaSemana si definición es 'C'");

      const existente = await tarifaRepository.buscarPorFecha({ dia: diaMes, mes, anio, tipoTarifa });
      if (existente && existente.id !== id)
        throw new HttpError(409, "Ya existe una tarifa del mismo tipo para esa fecha");
    }

    const montos = [montoFijoAlquiler, montoMinutoFraccion, montoHora, montoKm];
    if (montos.some(m => m < 0))
      throw new HttpError(400, "Los montos no pueden ser negativos");

    return tarifaRepository.actualizar(id, datos);
  }

  static async eliminar(id) {
    const tarifa = await tarifaRepository.obtenerPorId(id);
    if (!tarifa) throw new HttpError(404, "Tarifa no encontrada");
    return tarifaRepository.eliminar(id);
  }
}

export default TarifaService;
