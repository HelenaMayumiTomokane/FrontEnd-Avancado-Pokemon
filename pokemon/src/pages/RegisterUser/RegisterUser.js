import React, { useState } from "react";
import "./RegisterUser.css";
import * as api_account_user from "../../components/internal_api/account_user";

function RegisterUser() {
  const [login, setLogin] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [name, setName] = useState(""); 
  const [role, setRole] = useState("user"); 
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await api_account_user.APIPost_AccountUser(name,password,login,role);
      if (data && data.user_id) { setMessage(`Usuário criado com sucesso!`); setLogin(""); setPassword(""); setName(""); setRole("user"); } 
      else { setMessage(data.message || "Erro ao criar usuário."); }
    } catch (error) { console.error("Erro na requisição:", error); setMessage("Erro de conexão com o servidor."); }
  };

  return (
    <div className="register-container">
      <h2>Criar Novo Usuário</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Login:</label><input type="text" value={login} onChange={(e) => setLogin(e.target.value)} required />
        <label>Nome:</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Senha:</label><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label>Tipo de Usuário:</label><select value={role} onChange={(e) => setRole(e.target.value)}><option value="user">Usuário</option><option value="admin">Administrador</option></select>
        <button type="submit">Cadastrar</button>
      </form>
      {message && <p className="register-message">{message}</p>}
    </div>
  );
}

export default RegisterUser;
