import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonPage.css";

function PokemonPage() {
  const { pokemonName } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemon();
  }, [pokemonName]);

  if (loading) return <p>Carregando Pokémon...</p>;
  if (!pokemonData) return <p>Pokémon não encontrado!</p>;

  return (
    <div className="pokemon-page-container">
      <h1>{pokemonData.name}</h1>
      <img
        src={pokemonData.sprites.front_default}
        alt={pokemonData.name}
        className="pokemon-image"
      />
      <p>Tipo(s): {pokemonData.types.map(t => t.type.name).join(", ")}</p>
      <p>Altura: {pokemonData.height / 10} m</p>
      <p>Peso: {pokemonData.weight / 10} kg</p>
      <button className="capture-button" onClick={() => alert(`${pokemonData.name} capturado!`)}>
        Capturar
      </button>
    </div>
  );
}

export default PokemonPage;
