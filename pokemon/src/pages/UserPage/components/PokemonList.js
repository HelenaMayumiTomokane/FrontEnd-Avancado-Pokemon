import React from "react";

function PokemonList({ pokemons, setPokemons, onUpdatePokemonName, onDeletePokemon }) {
  return (
    <div id="user-pokemon">
      <div id="pokemon-grid">
        {pokemons.map(pokemon => (
          <div key={pokemon.pokemon_id} id="pokemon-card">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_id_external_api}.png`}
              alt={pokemon.pokemon_species}
            />
            <div>
              <label>ID Interno:</label> {pokemon.pokemon_id}<br />
              <label>ID API:</label> {pokemon.pokemon_id_external_api}<br />
              <label>Espécie:</label> {pokemon.pokemon_species}<br />
              <label>Apelido:</label>
              <input
                type="text"
                value={pokemon.pokemon_name}
                onChange={e =>
                  setPokemons(prev =>
                    prev.map(p => p.pokemon_id === pokemon.pokemon_id ? { ...p, pokemon_name: e.target.value } : p)
                  )
                }
              />
            </div>
            <div>
              <button onClick={() => onUpdatePokemonName(pokemon.pokemon_id, pokemon.pokemon_name)}>
                Alterar Apelido
              </button>
              <button onClick={() => onDeletePokemon(pokemon.pokemon_id)}>Remover</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonList;
