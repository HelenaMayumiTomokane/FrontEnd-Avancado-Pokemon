import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIPost_OwnerPokemon } from "../../components/Internal_API/Owner_Pokemon";
import "./PokemonPage.css";

function PokemonPage() {
  const { pokemonName } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  const user_id = localStorage.getItem("user_id"); // ID do usuário logado

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
        );
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

  const handleCapture = async () => {
    if (!user_id) {
      alert("⚠ Você precisa estar logado para capturar Pokémon!");
      return;
    }

    try {
      const response = await APIPost_OwnerPokemon(
        user_id,
        pokemonData.id,
        pokemonData.name
      );
      alert(`🎉 ${pokemonData.name.toUpperCase()} capturado com sucesso!`);
    } catch (error) {
      console.error("Erro ao capturar Pokémon:", error);
      alert("❌ Erro ao capturar Pokémon.");
    }
  };

  if (loading)
    return <p id="loading">Carregando informações do Pokémon...</p>;

  if (!pokemonData) return <p id="error">Pokémon não encontrado!</p>;

  return (
    <div id="pokemon-page-container">
      <div id="pokemon-card">
        <h1 id="pokemon-name">
          {pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}
        </h1>

        <div id="pokemon-info">
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            id="pokemon-image"
          />

          <div id="pokemon-details">
            <p>
              <strong>Tipo:</strong>{" "}
              {pokemonData.types.map((t) => t.type.name).join(", ")}
            </p>
            <p>
              <strong>Altura:</strong> {pokemonData.height / 10} m
            </p>
            <p>
              <strong>Peso:</strong> {pokemonData.weight / 10} kg
            </p>
          </div>
        </div>

        <button id="capture-button" onClick={handleCapture}>
          🎯 Capturar Pokémon
        </button>
      </div>
    </div>
  );
}

export default PokemonPage;
