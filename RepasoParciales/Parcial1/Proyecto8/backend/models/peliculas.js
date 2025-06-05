// models/albumes.js
// Importa los tipos de datos que proporciona Sequelize
import { DataTypes } from "sequelize";


// Definición del modelo Pelicula
export const definePeliculaModel = (sequelize) => {
  return sequelize.define("Pelicula", {
    idPelicula: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Título de la película, obligatorio, máximo 100 caracteres
    titulo: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // Nombre del director, obligatorio, máximo 50 caracteres
    director: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    // Año de estreno como número entero, obligatorio
    anioEstreno: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Género de la película, obligatorio, máximo 30 caracteres
    genero: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    // Puntaje IMDB (decimal), opcional
    puntajeIMDB: {
      type: DataTypes.DECIMAL(3, 1), // por ejemplo 7.8
      allowNull: true,
    },
  }, {
    timestamps: false, // Desactiva createdAt y updatedAt
  });
};