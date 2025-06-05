import { ProductoModel } from "../databases/db.js";
import { Op } from "sequelize";

export async function getProductosDisponibles() {
  return await ProductoModel.findAll({ where: { aReponer: "N" } });
}

export async function getProductosPorNombre(nombre) {
  return await ProductoModel.findAll({
    where: {
      aReponer: "N",
      nombre: {
        [Op.like]: `%${nombre.trim()}%`
      }
    }
  });
}

export async function crearProducto(data) {
  return await ProductoModel.create(data);
}
