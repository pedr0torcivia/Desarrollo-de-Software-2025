// models/cuenta.js

import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sequelize from "../db.js";
import Barrio from "./barrio.js";

class Cuenta extends Model {
  static saltRounds = 10;

  getNombre() {
    return this.nombre;
  }

  getCuentaSegura() {
    const { idCuenta, nombre, apellido, mail, admin } = this;
    return { idCuenta, nombre, apellido, mail, admin };
  }

  async setPassword(plainPass) {
    const hashedPass = await bcrypt.hash(plainPass, Cuenta.saltRounds);
    this.password = hashedPass;
  }

  async validarPassword(plainPass) {
    return bcrypt.compare(plainPass, this.password);
  }

  generarJwt() {
    const payload = {
      id: this.idCuenta,
      nombre: this.getNombre(),
      apellido: this.apellido,
      mail: this.mail,
      admin: this.admin
    };
    return jwt.sign(payload, process.env.SECRET);
  }
}

Cuenta.init(
  {
    idCuenta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID_CUENTA",
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "NOMBRE",
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "APELLIDO",
    },
    mail: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      field: "MAIL",
      validate: {
        isEmail: { msg: "El correo electrónico no es válido" },
      },
    },
    direccion: {
      type: DataTypes.STRING(250),
      allowNull: true,
      field: "DIRECCION",
    },
    idBarrio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "ID_BARRIO",
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: true,
      field: "PASSWORD",
    },
    admin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: "ADMIN",
      validate: {
        isIn: {
          args: [[0, 1]],
          msg: "El campo 'admin' debe ser 0 o 1",
        },
      },
    },
    fechaHoraCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "FECHA_HORA_CREACION",
    },
  },
  {
    sequelize,
    modelName: "Cuenta",
    tableName: "CUENTAS",
    timestamps: false,
  }
);

// Relación con Barrio
Cuenta.belongsTo(Barrio, {
  foreignKey: { name: "idBarrio", field: "ID_BARRIO" },
  as: "barrio",
});

export default Cuenta;

