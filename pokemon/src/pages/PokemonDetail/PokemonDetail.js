import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIGetPokemonData } from "../../components/External_API/PokemonData_PokeAPI";
import "./PokemonDetail.css";

function PokemonDetail() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showAllMoves, setShowAllMoves] = useState(false);
  const [searchMove, setSearchMove] = useState("");

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const data = await APIGetPokemonData(id);
        setPokemon(data);
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPokemon();
  }, [id]);

  if (loading) return <p>Carregando dados do Pokémon...</p>;
  if (!pokemon) return <p>Não foi possível carregar os dados do Pokémon.</p>;

  // ======== FILTRAR MOVIMENTOS ========
  const filteredMoves = pokemon.moves.filter((moveObj) =>
    moveObj.move.name.toLowerCase().includes(searchMove.toLowerCase())
  );

  // ======== AGRUPAR MOVIMENTOS ========
  const groupedMoves = filteredMoves.reduce((levelGroups, moveObj) => {
    const details = moveObj.version_group_details?.[0] || {};
    const level = details.level_learned_at ?? 0;
    const method = details.move_learn_method?.name || "unknown";

    if (!levelGroups[level]) levelGroups[level] = {};
    if (!levelGroups[level][method]) levelGroups[level][method] = [];

    levelGroups[level][method].push(moveObj.move.name);
    return levelGroups;
  }, {});

  const sortedLevels = Object.keys(groupedMoves).map(Number).sort((a, b) => a - b);
  const displayedLevels = showAllMoves ? sortedLevels : sortedLevels.slice(0, 3);

  return (
    <div className="pokemon-detail">
      <h1>{pokemon.name.toUpperCase()}</h1>

      {/* ======== COLUNA DA IMAGEM ======== */}
      <div className="pokemon-image-col">
        <img
          src={pokemon.sprites?.front_default}
          alt={pokemon.name}
          className="pokemon-image"
        />
      </div>

      {/* ======== INFORMAÇÕES ======== */}
      <div className="pokemon-info">
        <div className="info-card">
          <h3>ID</h3>
          <p>{pokemon.id}</p>
        </div>
        <div className="info-card">
          <h3>Altura</h3>
          <p>{pokemon.height}</p>
        </div>
        <div className="info-card">
          <h3>Peso</h3>
          <p>{pokemon.weight}</p>
        </div>
        <div className="info-card">
          <h3>Tipos</h3>
          <div className="pokemon-types">
            {pokemon.types.map((t, idx) => (
              <span key={idx}>{t.type.name}</span>
            ))}
          </div>
        </div>

        {/* Habilidades */}
        <div className="pokemon-abilities">
          <h2>Habilidades</h2>
          <ul>
            {pokemon.abilities.map((a, idx) => (
              <li key={idx}>{a.ability.name}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* ======== ESTATÍSTICAS ======== */}
      <div className="pokemon-stats">
        <h2>Estatísticas</h2>
        {pokemon.stats.map((statObj, idx) => (
          <div key={idx} className="stat-row">
            <span className="stat-name">{statObj.stat.name.toUpperCase()}</span>
            <div className="stat-bar">
              <div
                className="stat-fill"
                style={{
                  width: `${(statObj.base_stat / 200) * 100}%`,
                }}
              >
                {statObj.base_stat}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ======== MOVIMENTOS ======== */}
      <div className="pokemon-moves">
        <h2>Movimentos</h2>
        <div className="pokemon-moves-filter">
          <input
            type="text"
            placeholder="Filtrar movimentos..."
            value={searchMove}
            onChange={(e) => setSearchMove(e.target.value)}
          />
        </div>

        {sortedLevels.length === 0 ? (
          <p>Nenhum movimento encontrado.</p>
        ) : (
          <>
            {displayedLevels.map((level) => (
              <div key={level} className="move-group">
                <h3>Nível {level}</h3>
                {Object.keys(groupedMoves[level]).map((method) => (
                  <div key={method} className="move-method-group">
                    <h4>Método: {method}</h4>
                    <ul>
                      {groupedMoves[level][method].map((moveName, idx) => (
                        <li key={idx}>{moveName}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
            {sortedLevels.length > 3 && (
              <button
                className="show-more-btn"
                onClick={() => setShowAllMoves(!showAllMoves)}
              >
                {showAllMoves ? "Mostrar menos" : "Mostrar todos"}
              </button>
            )}
          </>
        )}
      </div>

      {/* ======== ITENS SEGURADOS ======== */}
      {pokemon.held_items?.length > 0 && (
        <div className="pokemon-held-items">
          <h2>Itens Segurados</h2>
          <ul className="held-items-list">
            {pokemon.held_items.map((itemObj, idx) => (
              <li key={idx}>{itemObj.item.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokemonDetail;
