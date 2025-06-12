import sequelize from '../database/sequelize.js';

const getAll = async () => {
  const resultado = await sequelize.models.Reserva.findAll({
    attributes: ['id', 'Dni', 'FechaIngreso', 'FechaSalida', 'TipoEstadia', 'Huespedes'],
    order: [['FechaIngreso', 'ASC']],
  });

  return resultado.map(p => ({
    id: p.id,
    Dni: p.Dni,
    FechaIngreso: p.FechaIngreso,
    FechaSalida: p.FechaSalida,
    TipoEstadia: p.TipoEstadia,
    Huespedes: p.Huespedes,
  }));
};

const create = async (reserva) => {
  const resultado = await sequelize.models.Reserva.create({
    Dni: reserva.Dni,
    FechaIngreso: reserva.FechaIngreso,
    FechaSalida: reserva.FechaSalida,
    TipoEstadia: reserva.TipoEstadia,
    Huespedes: reserva.Huespedes,
  });

  return { id: resultado.id };
};

export default {
  getAll,
  create
};
