import React, { useState } from "react";
import "./LoginPage.css";
import * as api_account_user from "../../components/Internal_API/Account_User";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await api_account_user.APIGet_AccountUserByLoginPassword(login, password);

      if (response && response.user_id) {
        setMessage("Login realizado com sucesso!");
        localStorage.setItem("user_id", response.user_id);
        navigate("/"); 
        window.location.reload()
      } else {
        setMessage(response?.message || "Erro no login. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
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
