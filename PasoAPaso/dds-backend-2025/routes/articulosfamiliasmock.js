const express = require('express');
const router = express.Router();

let arr_ArticulosFamiliasMock = [
  {
    "IdCategoria": 1,
    "Nombre": "Accesorios"
  },
  {
    "IdCategoria": 2,
    "Nombre": "Audio"
  },
  {
    "IdCategoria": 3,
    "Nombre": "Celulares"
  },
  {
    "IdCategoria": 4,
    "Nombre": "Cuidado Personal"
  },
  {
    "IdCategoria": 5,
    "Nombre": "Dvd"
  },
  {
    "IdCategoria": 6,
    "Nombre": "Fotografia"
  },
  {
    "IdCategoria": 7,
    "Nombre": "Frio-Calor"
  },
  {
    "IdCategoria": 8,
    "Nombre": "Gps"
  },
  {
    "IdCategoria": 9,
    "Nombre": "Informatica"
  },
  {
    "IdCategoria": 10,
    "Nombre": "Led - Lcd"
  }
];

router.get('/api/articulosfamiliasmock', async function (req, res) {
  res.json(arr_ArticulosFamiliasMock);
});

router.get('/api/articulosfamiliasmock/:id', async function (req, res) {
    let articuloFamilia = arr_ArticulosFamiliasMock.find(
      (x) => x.IdCategoria == req.params.id
    );
    if (articuloFamilia) res.json(articuloFamilia);
    else res.status(404).json({ message: 'articulofamilia no encontrado' });
  });

  router.post('/api/articulosfamiliasmock/', (req, res) => {
    const { Nombre } = req.body;
    let articuloFamilia = {
      Nombre,
      IdCategoria: Math.floor(Math.random()*100000),
    };
  
    // aqui agregar a la coleccion
    arr_ArticulosFamiliasMock.push(articuloFamilia);
  
    res.status(201).json(articuloFamilia);
  });
  router.put('/api/articulosfamiliasmock/:id', (req, res) => {
    let articuloFamilia = arr_ArticulosFamiliasMock.find(
      (x) => x.IdCategoria == req.params.id
    );
  
    if (articuloFamilia) {
      const { Nombre } = req.body;
      articuloFamilia.Nombre = Nombre;
      res.json({ message: 'articulofamilia actualizado' });
    } else {
      res.status(404).json({ message: 'articulofamilia no encontrado' })
    }
  });
  
  router.delete('/api/articulosfamiliasmock/:id', (req, res) => {
    let articuloFamilia = arr_ArticulosFamiliasMock.find(
      (x) => x.IdCategoria == req.params.id
    );
  
    if (articuloFamilia) {
      arr_ArticulosFamiliasMock = arr_ArticulosFamiliasMock.filter(
        (x) => x.IdCategoria != req.params.id
      );
      res.json({ message: 'articulofamilia eliminado' });
    } else {
      res.status(404).json({ message: 'articulofamilia no encontrado' })
    }
  });
  
module.exports = router;
