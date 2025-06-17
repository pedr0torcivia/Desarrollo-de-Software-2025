import RepositorioBase from "./repositorioBase.js";
import Barrio from "../models/barrio.js";

class BarrioRepository extends RepositorioBase {
  constructor() {
    super(Barrio);
  }

  // Método específico: obtener todos ordenados alfabéticamente
  async obtenerTodosOrdenados() {
    return this.modelo.findAll({
      order: [["nombre", "ASC"]]
    });
  }
}

export default new BarrioRepository();
