const obtenerPokemones = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon";
    const response = await fetch(url); // dispara un GET a la API y devuelve un JSON
    const pokemones = await response.json(); // Se pasa el JSON a un objeto normal para poder manipularlo
    console.log(pokemones);
    
    pokemones.results.map(pokemon => console.log(pokemon.name));
};

obtenerPokemones()
