const baseURL = "https://pokeapi.co/api/v2";

export function APIGetPokemonData(pokemon_id) {
  return fetch(`${baseURL}/pokemon/${pokemon_id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao buscar Pokémon");
      }
      return response.json(); // Retorna o objeto completo
    });
}
