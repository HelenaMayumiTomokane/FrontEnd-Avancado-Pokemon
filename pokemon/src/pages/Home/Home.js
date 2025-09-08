import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Home.css";

function Home() {
  const [pokemon, setPokemon] = useState(null);
  const [search, setSearch] = useState("ditto"); // Pokémon inicial
  const [error, setError] = useState(null);

  // Função para buscar o Pokémon
  const fetchPokemon = async (name) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
      setPokemon(response.data);
      setError(null);
    } catch (err) {
      setError("Pokémon não encontrado!");
      setPokemon(null);
    }
  };

  // Buscar o primeiro Pokémon ao carregar
  useEffect(() => {
    fetchPokemon(search);
  }, []);

  return (
    <div className="home-container">
      <h1>Pokémon Finder</h1>

      <div className="search-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Digite o nome do Pokémon"
        />
        <button onClick={() => fetchPokemon(search)}>Buscar</button>
      </div>

      {error && <p className="error">{error}</p>}

      {pokemon && (
        <div className="pokemon-card">
          <h2>{pokemon.name.toUpperCase()}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p><strong>Altura:</strong> {pokemon.height}</p>
          <p><strong>Peso:</strong> {pokemon.weight}</p>
          <p><strong>ID:</strong> {pokemon.id}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
