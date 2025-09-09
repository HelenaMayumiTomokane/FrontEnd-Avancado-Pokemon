const baseURL = "http://127.0.0.1:5000";

/*------------------- API com a tabela Owner Pokemon ---------------------------*/

// GET todos os Pokémon de todos os usuários
export function APIGet_AllOwnerPokemon(user_id) {
  return fetch(`${baseURL}/owner_pokemon/user_id?user_id=${user_id}`)
    .then(response => response.json())
    .then(data => data);
}

// POST: adicionar novo Pokémon a um usuário
export function APIPost_OwnerPokemon(user_id, pokemon_id_external_api, pokemon_species) {
  return fetch(`${baseURL}/owner_pokemon`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: parseInt(user_id),
      pokemon_id_external_api: parseInt(pokemon_id_external_api),
      pokemon_name: String(pokemon_species),
      pokemon_species: String(pokemon_species)
    })
  })
  .then(response => response.json())
  .then(data => data);
}

// PUT: atualizar dados de um Pokémon de um usuário
export function APIPut_OwnerPokemon(pokemon_id, user_id, pokemon_species,pokemon_id_external_api,pokemon_name) {
  return fetch(`${baseURL}/owner_pokemon`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pokemon_id: parseInt(pokemon_id),
      user_id: parseInt(user_id),
      pokemon_id_external_api: parseInt(pokemon_id_external_api),
      pokemon_name: String(pokemon_name),
      pokemon_species: String(pokemon_species)
    })
  })
  .then(response => response.json())
  .then(data => data);
}

// DELETE: remover Pokémon de um usuário
export function APIDelete_OwnerPokemon(pokemon_id) {
  return fetch(`${baseURL}/owner_pokemon`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      pokemon_id: parseInt(pokemon_id)
    })
  })
  .then(response => response.json())
  .then(data => data);
}
