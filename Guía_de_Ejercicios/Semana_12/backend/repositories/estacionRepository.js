import { Op } from "sequelize";
import RepositorioBase from "./repositorioBase.js";
import Estacion from "../models/estacion.js";
import Barrio from "../models/barrio.js";

class EstacionRepository extends RepositorioBase {
  constructor() {
    super(Estacion);
  }

  // Método para buscar estaciones con filtros de texto, barrio e inactivos
  async buscarConFiltros({ texto = "", barrioId = -1, incluyeInactivos = false } = {}) {
    const where = {};

    if (texto.trim() !== "") {
      where[Op.or] = [
        { nombre: { [Op.like]: `%${texto}%` } },
        { direccion: { [Op.like]: `%${texto}%` } }
      ];
    }

    if (!Number.isNaN(barrioId) && barrioId !== -1) {
      where.idBarrio = barrioId;
    }

    if (!incluyeInactivos) {
      where.activa = 1;
    }

    return this.modelo.findAll({
      where,
      include: {
        model: Barrio,
        as: "barrio"
      }
    });
  }

  // Método para obtener una estación por id incluyendo el barrio
  async obtenerPorIdConBarrio(id) {
    return this.modelo.findByPk(id, {
      include: {
        model: Barrio,
        as: "barrio"
      }
    });
  }
}

export default new EstacionRepository();
