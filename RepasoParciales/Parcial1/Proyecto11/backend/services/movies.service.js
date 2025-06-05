// services/movies.service.js
import { MovieModel } from "../databases/db.js";
import languages from "../data/languages.js";
import { Op } from "sequelize";

const mapMovie = (movie) => ({
  title: movie.TITLE,
  releaseDate: movie.RELEASE_DATE,
  language: languages[movie.LANGUAGE] || movie.LANGUAGE, // ✅ Mapeo acá
  runtime: movie.RUNTIME,
  budgetMillions: Math.round((movie.BUDGET || 0) / 1_000_000),
  voteAverage: movie.VOTE_AVERAGE
});

const movieService = {
  async getPopular() {
    const movies = await MovieModel.findAll({
      where: { STATUS: "Released" },
      order: [["POPULARITY", "DESC"]],
      limit: 20
    });
    return movies.map(mapMovie);
  },

  async getByFilter({ titulo, lenguaje }) {
    const where = {
      STATUS: "Released"
    };

    if (titulo) {
      where.TITLE = { [Op.like]: `%${titulo}%` };
    }

    if (lenguaje) {
      where.LANGUAGE = lenguaje;
    }

    const movies = await MovieModel.findAll({ where });
    return movies.map(mapMovie);
  }
};

export default movieService;
