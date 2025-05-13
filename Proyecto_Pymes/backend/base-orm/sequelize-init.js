import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("sqlite:./.data/pymes.db");

const articulosfamilias = sequelize.define("articulosfamilias", {
  IdArticuloFamilia: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Nombre: {
    type: DataTypes.STRING(30),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: "Nombre es requerido",
      },
    },
  },
}, {
  timestamps: false,
});

export { sequelize, articulosfamilias };
