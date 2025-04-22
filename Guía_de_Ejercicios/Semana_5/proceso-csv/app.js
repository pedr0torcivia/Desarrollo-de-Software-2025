import { createReadStream } from "fs";
import csv from "csv-parser";

// Función para leer archivo CSV y devolver una promesa con el resultado
function readCSV(file) {
  return new Promise((resolve, reject) => {
    const results = [];
    try {
      createReadStream(file)
        .on("error", (error) => reject(error))
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => resolve(results));
    } catch (error) {
      reject(error);
    }
  });
}

// Función principal autoinvocada
(async function main() {
  try {
    const data = await readCSV("./data/tbbt.csv");

    // 1. Listar los títulos de todos los episodios de la temporada 1
    const season1Episodes = data.filter(episode => episode.season === '1');
    console.log("Títulos de todos los episodios de la temporada 1:");
    season1Episodes.forEach(episode => console.log(episode.title));

    // 2. Mostrar el título del episodio 22 de la temporada 3
    const episode22Season3 = data.find(episode => episode.season === '3' && episode.episode === '22');
    console.log("\nTítulo del episodio 22 de la temporada 3:", episode22Season3.title);

    // 3. Calcular y mostrar el promedio de rating de la temporada 3
    const season3Episodes = data.filter(episode => episode.season === '3');
    const avgRating = season3Episodes.reduce((sum, episode) => sum + parseFloat(episode.rating_imdb), 0) / season3Episodes.length;
    console.log("\nPromedio de rating de la temporada 3:", avgRating.toFixed(2));

    // Desafío 1: Usar filter para obtener y foreach para mostrar el listado de título y rating_imdb de todos los episodios de la temporada 1
    console.log("\nListado de títulos y ratings de la temporada 1:");
    season1Episodes.forEach(episode => console.log(`${episode.title} - IMDb Rating: ${episode.rating_imdb}`));

    // Desafío 2: Mostrar el título del episodio 22 de la temporada 3 utilizando find
    console.log("\nTítulo del episodio 22 de la temporada 3 (usando find):", episode22Season3.title);

    // Desafío 3: Aprovechando las funcionalidades de reduce y filter mostrar el promedio del rating_imdb de la temporada 3
    console.log("\nPromedio del rating_imdb de la temporada 3 (usando reduce y filter):", avgRating.toFixed(2));

  } catch (error) {
    console.error("Error al leer archivo CSV:", error);
  }
})();