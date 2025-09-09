const baseURL = "https://pokeapi.co/api/v2";

// Retorna todos os habitats
export function APIGetAllHabitats() {
  return fetch(`${baseURL}/pokemon-habitat/`)
    .then((response) => response.json())
    .then((data) => data.results);
}

// Retorna todos os Pokémon de um habitat específico
export function APIGetAllHabitatsPokemon(habitatName) {
  return fetch(`${baseURL}/pokemon-habitat/${habitatName}/`)
    .then((response) => response.json())
    .then((data) => data.pokemon_species); // só retorna a lista de Pokémon
}
