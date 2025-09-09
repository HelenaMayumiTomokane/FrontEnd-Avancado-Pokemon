import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { APIGetAllHabitatsPokemon } from "../../components/external_api/pokeapi/habitat";
import "./HabitatPage.css";

function HabitatPage() {
  const { habitatName } = useParams(); // pega o habitat da URL
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await APIGetAllHabitatsPokemon(habitatName);
        setPokemonList(data); // data já é um array de pokemon_species
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [habitatName]);

  // Função auxiliar para pegar o ID do Pokémon a partir da URL
  function getPokemonId(url) {
    const parts = url.split("/").filter(Boolean); // remove strings vazias
    return parts[parts.length - 1]; // retorna o último número da URL
  }

  if (loading) return <p>Carregando Pokémon do habitat {habitatName}...</p>;

  return (
    <div className="habitat-page-container">
      <h1>Pokémon do habitat: {habitatName}</h1>
      <div className="pokemon-grid">
        {pokemonList.map((pokemon) => (
          <div
            key={pokemon.name}
            className="pokemon-card"
            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
          >
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(
                pokemon.url
              )}.png`}
              alt={pokemon.name}
            />
            <h3>{pokemon.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HabitatPage;
