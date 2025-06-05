// routes/movies.routes.js
import express from "express";
import movieService from "../services/movies.service.js";

const router = express.Router();

router.get("/populares", async (req, res) => {
  try {
    const movies = await movieService.getPopular();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { titulo, lenguaje } = req.query;
    const movies = await movieService.getByFilter({ titulo, lenguaje });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
