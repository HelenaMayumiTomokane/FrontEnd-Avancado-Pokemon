import React, { useState } from "react";
import "./MiniGamesPage.css";
import * as api_cash_audit from "../../components/Internal_API/Cash_Audit";

function MiniGamesPage() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState(0);
  const [message, setMessage] = useState("");

  const user_id = localStorage.getItem("user_id");

  const handleClick = () => setCount(prev => prev + 1);

  const handleFinish = async () => {
    const finalValue = count * 2; // multiplicador definido
    setValue(finalValue);

    try {
      const data = await api_cash_audit.APIPost_CashAudit(user_id, "input", finalValue);
      if (data && data.cash_id) {
        setMessage(`🎉 Mini game finalizado! Você ganhou ${finalValue} cash.`);
        setCount(0);
        setValue(0);
      } else {
        setMessage("❌ Erro ao finalizar mini game.");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Erro de conexão.");
    }
  };

  return (
    <div id="minigame-page">
      <h1 id="minigame-title">Mini Game Pokémon</h1>

      <div id="counter-display">
        {count === 0 ? "Clique no botão!" : `Você clicou ${count} vezes`}
      </div>

      <button id="round-button" onClick={handleClick}>
        Aperte-me
      </button>

      <div id="finish-section">
        <button id="finish-button" onClick={handleFinish}>
          Finalizar Mini Game
        </button>
      </div>

      {message && <p id="minigame-message">{message}</p>}
    </div>
  );
}

export default MiniGamesPage;
