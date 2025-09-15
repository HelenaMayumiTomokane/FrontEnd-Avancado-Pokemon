import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIGetAllHabitats } from "../../components/External_API/Habitat_PokeAPI";
import "./Home.css";

function Home() {
  const [habitats, setHabitats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Carrossel
  const slides = [
    {
      id: 1,
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      title: "Explore os Habitats",
      subtitle: "Descubra onde os Pokémons vivem!",
    },
    {
      id: 2,
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      title: "Capture Pokémons",
      subtitle: "Aventure-se e aumente sua coleção!",
    },
    {
      id: 3,
      img: "https://cdn-icons-png.flaticon.com/512/263/263142.png",
      title: "Colete Berries",
      subtitle: "Compre berries na loja e evolua mais rápido!",
    },
  ];

  // Troca automática do carrossel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handlePrev = () =>
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  // Fetch habitats
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

  const handleHabitatClick = (habitatName) => {
    navigate(`/habitats/${habitatName}`);
  };

  if (loading) return <p id="loading-text">Carregando habitats...</p>;

  // Ícones por habitat
  const habitatIcons = {
    cave: "🗻",
    forest: "🌲",
    grassland: "🌾",
    mountain: "⛰️",
    rare: "✨",
    rough_terrain: "🪨",
    sea: "🌊",
    urban: "🏙️",
    wetlands: "🪵",
    waters_edge: "🏞️",
  };

  // Função para pegar ícone, ajustando nomes com "-"
  const getHabitatIcon = (name) => {
    const key = name.replace(/-/g, "_");
    return habitatIcons[key] || "❔";
  };

  return (
    <div id="home-container">
      {/* ------------------ CARROSSEL ------------------ */}
      <div id="carousel">
        <div
          id="carousel-inner"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div id="carousel-item" key={slide.id}>
              <img src={slide.img} alt={slide.title} id="carousel-image" />
              <div id="carousel-caption">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <button id="carousel-btn prev" onClick={handlePrev}>
          ❮
        </button>
        <button id="carousel-btn next" onClick={handleNext}>
          ❯
        </button>

        <div id="carousel-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              id={`dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      {/* ------------------ HABITATS ------------------ */}
      <div id="home-card">
        <h2 id="home-title">Escolha um Habitat</h2>
        <p id="home-subtitle">
          Selecione um habitat para ver os Pokémons que vivem nele.
        </p>

        <div id="habitat-buttons">
          {habitats.map((habitat) => (
            <button
              key={habitat.name}
              id="habitat-btn"
              onClick={() => handleHabitatClick(habitat.name)}
            >
              <span id="habitat-icon">
                {getHabitatIcon(habitat.name)}
              </span>
              <span id="habitat-name">
                {habitat.name.charAt(0).toUpperCase() + habitat.name.slice(1)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
