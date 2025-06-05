// databases/db.js
import { Sequelize } from "sequelize";
import { defineMovieModel } from "../models/movie.model.js";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./data/db.sqlite"
});

const MovieModel = defineMovieModel(sequelize);

export { sequelize, MovieModel };
