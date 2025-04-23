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
    const desafio2 = data.find(ep => ep.season === '3' && ep.episode === '22');
    console.log("\n[Desafío 2] Título del episodio 22 de la temporada 3:", desafio2 ? desafio2.title : "No encontrado");

    // Desafío 3: Aprovechando las funcionalidades de reduce y filter mostrar el promedio del rating_imdb de la temporada 3
    const ratingsTemp3 = data
      .filter(ep => ep.season === '3')
      .reduce((acc, ep, _, arr) => acc + parseFloat(ep.rating_imdb) / arr.length, 0);
    console.log("\n[Desafío 3] Promedio del rating_imdb de la temporada 3:", ratingsTemp3.toFixed(2));

  } catch (error) {
    console.error("Error al leer archivo CSV:", error);
  }
})();
