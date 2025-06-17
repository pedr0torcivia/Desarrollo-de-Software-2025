// services/cuentaService.js

import cuentaRepository from "../repositories/cuentaRepository.js";

class CuentaService {
  async obtenerTodosLosAdmins() {
    return await cuentaRepository.obtenerCuentasAdmin();
  }

  async obtenerCuentaSeguraPorMail(mail) {
    return await cuentaRepository.obtenerPorMail(mail);
  }

  async crearCuenta(data, plainPassword) {
    return await cuentaRepository.crearCuenta(data, plainPassword);
  }

  async eliminarCuentaPorMail(mail) {
    const cuenta = await cuentaRepository.obtenerPorMail(mail);
    if (!cuenta) return false;
    await cuentaRepository.delete(cuenta.idCuenta);
    return true;
  }

  async login(mail, plainPassword) {
    const cuenta = await cuentaRepository.obtenerCuentaCompletaPorMail(mail);
    if (!cuenta) return null;

    const passCorrecto = await cuenta.validarPassword(plainPassword);
    if (!passCorrecto) return null;

    return {
      mail: cuenta.mail,
      nombre: cuenta.getNombre(),
      token: cuenta.generarJwt(),
      admin: cuenta.admin == 0 ? false : true,
    };
  }
}

export default new CuentaService();
