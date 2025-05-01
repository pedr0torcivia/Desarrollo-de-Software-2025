import { DataTypes } from "sequelize";
import { defaultValueSchemable } from "sequelize/lib/utils";

// 12) Creacion de modelo de Tareas
const tareasAttributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    UsuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  };
const tareasMethods = {
    timestamps: false
}

const TareasModel = {
    tareasAttributes,
    tareasMethods,
}

export {TareasModel}