// src/pages/MiniGamesPage.js
import React, { useState } from "react";
import "./MiniGamesPage.css";
import * as api_cash_audit from "../../components/internal_api/cash_audit";

function MiniGamesPage() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState("");

  const user_id = localStorage.getItem("user_id");

  const handleClick = () => {
    setCount(prev => prev + 1);
  };

  const handleFinish = async () => {
    const finalValue = count * 2; // multiplicador definido
    setValue(finalValue);

    try {
      const data = await api_cash_audit.APIPost_CashAudit(user_id, "input", finalValue);
      if (data && data.cash_id) {
        setMessage(`Mini game finalizado! Você ganhou ${finalValue} cash.`);
        setCount(0); // reset contador
        setValue(0);
      } else {
        setMessage("Erro ao finalizar mini game.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erro de conexão.");
    }
  };

  return (
    <div className="minigame-button-page">
      <div className="click-counter">
        {count === 0 ? "Clique no botão!" : `Você clicou ${count} vezes`}
      </div>

      <button className="round-button" onClick={handleClick}>
        Aperte-me
      </button>

      <div className="finish-section">
        <br></br>
        <button className="finish-button" onClick={handleFinish}>
          Finalizar Mini Game
        </button>
      </div>

      {message && <p className="pokemon-message">{message}</p>}
    </div>
  );
}

export default MiniGamesPage;
