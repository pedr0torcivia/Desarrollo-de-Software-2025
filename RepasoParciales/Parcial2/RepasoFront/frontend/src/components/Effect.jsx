// src/components/Effect.jsx
import { useState, useEffect } from 'react';

export default function Effect() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());

  // useEffect se ejecuta una vez al montar el componente y luego cada segundo actualiza la hora
  useEffect(() => {
      // Función async declarada dentro de useEffect
      const traerPokemones = async () => {
        const url = "https://pokeapi.co/api/v2/pokemon";
        const response = await fetch(url);                  // Hacemos la solicitud a la API
        const pokemones = await response.json();            // Convertimos la respuesta a JSON
        pokemones.results.map(pokemon =>                    // Iteramos sobre los resultados
          console.log(pokemon.name)                         // Mostramos el nombre de cada Pokémon
        );
        console.log('----------------------------');
      };

      traerPokemones(); // Ejecutamos la función al montar
    }, []); // Dependencias vacías: se ejecuta solo al montar el componente

    return <div>useEffect</div>;
  }
