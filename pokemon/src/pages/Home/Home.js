import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIGetAllHabitats } from "../../components/external_api/pokeapi/habitat";
import "./Home.css";

function Home() {
  const [habitats, setHabitats] = useState([]);
  const [selectedHabitat, setSelectedHabitat] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHabitats = async () => {
      try {
        const data = await APIGetAllHabitats();
        setHabitats(data);
      } catch (error) {
        console.error("Erro ao buscar habitats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHabitats();
  }, []);

  const handleSelectChange = (e) => setSelectedHabitat(e.target.value);

  const handleGoClick = () => {
    if (selectedHabitat) navigate(`/habitats/${selectedHabitat}`);
  };

  if (loading) return <p id="loading-text">Carregando habitats...</p>;

  return (
    <div id="home-container">
      <div id="home-card">
        <h1 id="home-title">🌍 Habitats Pokémon</h1>
        <p id="home-subtitle">
          Escolha um habitat e explore os Pokémons que vivem nele!
        </p>

        <div id="habitat-selector">
          <select
            id="select-box"
            value={selectedHabitat}
            onChange={handleSelectChange}
          >
            <option value="">-- Selecione um habitat --</option>
            {habitats.map((habitat) => (
              <option key={habitat.name} value={habitat.name}>
                {habitat.name.charAt(0).toUpperCase() + habitat.name.slice(1)}
              </option>
            ))}
          </select>

          <button
            id="go-button"
            onClick={handleGoClick}
            disabled={!selectedHabitat}
          >
            Explorar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
