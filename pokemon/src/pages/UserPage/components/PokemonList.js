import React, { useState } from "react";
import * as api_owner_pokemon from "../../../components/Internal_API/Owner_Pokemon";

function PokemonList({ pokemons, setPokemons }) {
  return (
    <div className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard
          key={pokemon.pokemon_id}
          pokemon={pokemon}
          setPokemons={setPokemons}
        />
      ))}
    </div>
  );
}

function PokemonCard({ pokemon, setPokemons }) {
  const [nickname, setNickname] = useState(pokemon.pokemon_name || "");
  const user_id = localStorage.getItem("user_id");

  const handleUpdate = async () => {
    if (!nickname.trim()) {
      alert("O apelido não pode ser vazio.");
      return;
    }

    try {
      const data = await api_owner_pokemon.APIPut_OwnerPokemon(
        pokemon.pokemon_id,
        user_id,
        pokemon.pokemon_species,
        pokemon.pokemon_id_external_api,
        nickname
      );

      if (data && data.pokemon_id) {
        setPokemons((prev) =>
          prev.map((p) =>
            p.pokemon_id === pokemon.pokemon_id
              ? { ...p, pokemon_name: nickname }
              : p
          )
        );
        alert("Apelido atualizado!");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao atualizar apelido do Pokémon.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Deseja realmente remover ${pokemon.pokemon_species}?`)) return;

    try {
      const data = await api_owner_pokemon.APIDelete_OwnerPokemon(pokemon.pokemon_id);
      if (data && data.pokemon_id) {
        setPokemons((prev) =>
          prev.filter((p) => p.pokemon_id !== pokemon.pokemon_id)
        );
        alert("Pokémon removido!");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao remover Pokémon.");
    }
  };

  return (
    <div className="pokemon-card">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_id_external_api}.png`}
        alt={pokemon.pokemon_species}
      />
      <div className="pokemon-info">
        <label>Nome:</label> {pokemon.pokemon_species}<br />
        <label>Apelido:</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div className="pokemon-actions">
        <button onClick={handleUpdate}>Alterar Apelido</button>
        <button onClick={handleDelete}>Remover</button>
      </div>
    </div>
  );
}

export default PokemonList;
