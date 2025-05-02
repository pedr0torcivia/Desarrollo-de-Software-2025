
import express from "express";
import { AlbumModel } from "../databases/db.js";
import { Op } from "sequelize";

const router = express.Router();

// GET /api/álbumes?artista=nombre
router.get("/", async (req, res) => {
    try {
      const artista = req.query.artista || "";
  
      const albums = await AlbumModel.findAll({
        where: artista
          ? { artista: { [Op.like]: `%${artista}%` } }
          : {},
        attributes: ["id", "artista", "album", "genero", "precio"], // Agregado "id"
      });
  
      res.json(albums);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// POST /api/álbumes
router.post("/", async (req, res) => {
  try {
    const nuevoAlbum = await AlbumModel.create(req.body);
    res.status(201).json(nuevoAlbum);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/álbumes/:id
router.put("/:id", async (req, res) => {
  try {
    const [updated] = await AlbumModel.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const actualizado = await AlbumModel.findByPk(req.params.id);
      res.json(actualizado);
    } else {
      res.status(404).json({ error: "Álbum no encontrado" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET /api/álbumes/:id
router.get("/:id", async (req, res) => {
    try {
      const album = await AlbumModel.findByPk(req.params.id, {
        attributes: ["id", "artista", "album", "genero", "soporte", "precio"]
      });
  
      if (!album) {
        return res.status(404).json({ error: "Álbum no encontrado" });
      }
  
      res.json(album);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// DELETE /api/álbumes/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await AlbumModel.destroy({ where: { id: req.params.id } });

    if (deleted) {
      res.status(204).send(); // No Content
    } else {
      res.status(404).json({ error: "Álbum no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
