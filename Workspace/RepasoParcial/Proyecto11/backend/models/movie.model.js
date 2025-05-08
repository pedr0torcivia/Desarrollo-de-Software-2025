// models/movie.model.js
import { DataTypes } from "sequelize";

export const defineMovieModel = (sequelize) => {
  return sequelize.define("TMDB_MOVIES", {
    ID_MOVIE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    TITLE: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    STATUS: {
      type: DataTypes.TEXT
    },
    RELEASE_DATE: {
      type: DataTypes.TEXT
    },
    LANGUAGE: {
      type: DataTypes.TEXT
    },
    RUNTIME: {
      type: DataTypes.INTEGER
    },
    BUDGET: {
      type: DataTypes.INTEGER
    },
    POPULARITY: {
      type: DataTypes.REAL
    },
    VOTE_AVERAGE: {
      type: DataTypes.REAL
    },
    VOTE_COUNT: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false,
    tableName: "TMDB_MOVIES"
  });
};
