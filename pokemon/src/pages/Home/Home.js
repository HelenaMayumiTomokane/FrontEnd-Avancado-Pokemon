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

  if (loading) return <p className="loading">Carregando habitats...</p>;

  return (
    <div className="habitat-list-container">
      <h1>Habitats Pokémon</h1>
      <p className="subtitle">Selecione um habitat para explorar os Pokémons</p>

      <div className="habitat-dropdown">
        <select value={selectedHabitat} onChange={handleSelectChange}>
          <option value="">-- Selecione um habitat --</option>
          {habitats.map((habitat) => (
            <option key={habitat.name} value={habitat.name}>
              {habitat.name}
            </option>
          ))}
        </select>
        <button onClick={handleGoClick} disabled={!selectedHabitat}>
          Ir
        </button>
      </div>
    </div>
  );
}

export default Home;
