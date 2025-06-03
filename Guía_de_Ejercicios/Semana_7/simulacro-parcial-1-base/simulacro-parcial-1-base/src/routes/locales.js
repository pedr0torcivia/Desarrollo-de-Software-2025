// src/routes/locales.js
import express from 'express';
import StarbucksStore from '../models/StarbucksStore.js';
import countries from '../../data/countries.js';
import { Op } from 'sequelize';

const router = express.Router();

function calcularHemisferio(lat, long) {
  const ns = lat >= 0 ? 'Noreste'.slice(0, 3) : 'Sudeste'.slice(0, 3);
  const ew = long >= 0 ? 'este' : 'oeste';
  return (lat >= 0 ? 'Nor' : 'Sud') + (long >= 0 ? 'este' : 'oeste');
}

router.get('/', async (req, res) => {
  const { texto, hemisferio } = req.query;

  const where = {};
  if (texto) {
    where[Op.or] = [
      { STORE_NAME: { [Op.like]: `%${texto}%` } },
      { CITY: { [Op.like]: `%${texto}%` } }
    ];
  }

  try {
    let locales = await StarbucksStore.findAll({ where, limit: 1000 });

    locales = locales.map(l => {
      const hemis = calcularHemisferio(l.LATITUDE, l.LONGITUDE);
      return {
        nombre: l.STORE_NAME,
        direccion: l.STREET_ADDRESS,
        ciudad: l.CITY,
        pais: countries[l.COUNTRY] || l.COUNTRY,
        hemisferio: hemis
      };
    });

    if (hemisferio && hemisferio !== 'Todos') {
      locales = locales.filter(l => l.hemisferio === hemisferio);
    }

    res.json(locales.slice(0, 15));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener los locales' });
  }
});

export default router;
