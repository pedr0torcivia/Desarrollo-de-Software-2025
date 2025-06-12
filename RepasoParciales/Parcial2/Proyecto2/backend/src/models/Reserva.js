import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define("Reserva", {
    Dni: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FechaIngreso: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    FechaSalida: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    TipoEstadia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Huespedes: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
