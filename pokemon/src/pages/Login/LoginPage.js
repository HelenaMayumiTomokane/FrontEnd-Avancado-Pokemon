import React, { useState } from "react";
import "./LoginPage.css";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/account_user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login realizado com sucesso!");
        localStorage.setItem("user_id", data.user_id);
        window.location.href = "/";
      } else {
        setMessage(data.message || "Erro no login. Tente novamente.");
      }
    } catch (error) {
      setMessage("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="login-container">
      <h2>Entrar</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <label>Login:</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />

        <label>Senha:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>

      {message && <p className="login-message">{message}</p>}
    </div>
  );
}

export default LoginPage;
