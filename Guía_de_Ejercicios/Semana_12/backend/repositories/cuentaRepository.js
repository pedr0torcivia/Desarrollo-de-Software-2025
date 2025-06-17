// repositories/cuentaRepository.js

import RepositorioBase from "./repositorioBase.js";
import Cuenta from "../models/cuenta.js";
import Barrio from "../models/barrio.js";
import NotImplementedError from "../util/customErrors.js";

class CuentaRepository extends RepositorioBase {
  constructor() {
    super(Cuenta);
    this.create = () => {
      throw new NotImplementedError("Usar crearCuenta() en su lugar");
    };
  }

  // Obtener todas las cuentas (modo seguro) con paginado y barrio
  async obtenerTodos({ pagina = 1, limite = 10 } = {}) {
    const offset = (pagina - 1) * limite;
    const cuentas = await this.modelo.findAll({
      limit: limite,
      offset,
      include: { model: Barrio, as: "barrio" },
    });
    return cuentas.map((cuenta) => cuenta.getCuentaSegura());
  }

  // Obtener una cuenta por ID (modo seguro) con barrio
  async obtenerPorId(id) {
    const cuenta = await this.modelo.findByPk(id, {
      include: { model: Barrio, as: "barrio" },
    });
    return cuenta ? cuenta.getCuentaSegura() : null;
  }

  // Obtener una cuenta por mail (modo seguro) con barrio
  async obtenerPorMail(mail) {
    const cuenta = await this.modelo.findOne({
      where: { mail },
      include: { model: Barrio, as: "barrio" },
    });
    return cuenta ? cuenta.getCuentaSegura() : null;
  }

  // Crear una cuenta con contraseña segura
  async crearCuenta(data, plainPassword) {
    const cuenta = await this.modelo.create(data);
    await cuenta.setPassword(plainPassword);
    await cuenta.save(); // Actualiza el hash en BD
    return cuenta.getCuentaSegura();
  }

  // Obtener una cuenta completa por mail (para login)
  async obtenerCuentaCompletaPorMail(mail) {
    return this.modelo.findOne({
      where: { mail },
      include: { model: Barrio, as: "barrio" },
    });
  }

  // Obtener cuentas con rol admin = 1
  async obtenerCuentasAdmin() {
    const cuentas = await this.modelo.findAll({
      where: { admin: 1 },
      include: { model: Barrio, as: "barrio" },
    });
    return cuentas.map((cuenta) => cuenta.getCuentaSegura());
  }
}

export default new CuentaRepository();

