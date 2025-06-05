import { DataTypes } from "sequelize";
import { defaultValueSchemable } from "sequelize/lib/utils";

// 12) Creacion de modelo de usuarios
const usuariosAttributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    usuario: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha_alta: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true
    }
  };
const usuariosMethods = {
    timestamps: false
}

const UsuariosModel = {
    usuariosAttributes,
    usuariosMethods,
}

export {UsuariosModel}