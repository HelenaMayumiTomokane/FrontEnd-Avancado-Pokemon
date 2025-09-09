import React, { useEffect, useState } from "react";
import "./UserPage.css";
import * as api_account_user from "../../components/internal_api/account_user";
import { useNavigate } from "react-router-dom";


function UserPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const user_id = localStorage.getItem("user_id");

  // Puxar dados do usuário ao carregar a página
  useEffect(() => {
    if (user_id) {
      api_account_user.APIGet_AccountUserByUser_ID(user_id).then(data => {
        if (data) { setLogin(data.login); setPassword(data.password); setName(data.name); setRole(data.role); }
        else { setMessage("Erro ao carregar dados do usuário."); }
      });
    }
  }, [user_id]);

  // Atualizar usuário
  const handleUpdate = async () => {
    try {
      const data = await api_account_user.APIPut_AccountUser( user_id, login, password, name, role );
      if (data && data.user_id) setMessage("Usuário atualizado com sucesso!");
      else setMessage(data.message || "Erro ao atualizar usuário.");
    } catch (error) { setMessage("Erro de conexão."); }
  };

  // Deletar usuário
  const handleDelete = async () => {
    if (!window.confirm("Deseja realmente deletar sua conta?")) return;
    try {
      const data = await api_account_user.APIDelete_AccountUser(user_id );
      if (data && data.user_id) { 
        setMessage("Usuário deletado com sucesso!"); 
        localStorage.removeItem("user_id"); 
        navigate("/");
        window.location.reload()
    }
      else setMessage(data.message || "Erro ao deletar usuário.");
    } catch (error) { setMessage("Erro de conexão."); }
  };

  // Logout
  const handleLogout = () => { 
    localStorage.removeItem("user_id"); 
    navigate("/") 
    window.location.reload()
  };

  return (
    <div className="pokemon-user-page">
      <main className="pokemon-main">
        <div className="pokemon-card">
          <h2>Dados do Usuário</h2>
          <label>Login:</label><input type="text" value={login} onChange={e => setLogin(e.target.value)} />
          <label>Nome:</label><input type="text" value={name} onChange={e => setName(e.target.value)} />
          <label>Senha:</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <label>Tipo de Usuário:</label>
          <select value={role} onChange={e => setRole(e.target.value)}><option value="user">Usuário</option><option value="admin">Administrador</option></select>
          <div style={{ marginTop: "16px" }}>
            <button onClick={handleUpdate}>Atualizar</button> <button onClick={handleDelete}>Deletar</button> <button onClick={handleLogout}>Logout</button>
          </div>
          {message && <p className="pokemon-message">{message}</p>}
        </div>
      </main>
    </div>
  );
}

export default UserPage;
