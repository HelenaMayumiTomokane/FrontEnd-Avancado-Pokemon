import React, { useState, useEffect } from "react";
import { APIPut_AccountUser, APIDelete_AccountUser, APIGet_AccountUserByUser_ID } from "../../../components/Internal_API/Account_User";
import { Eye, EyeOff } from "lucide-react";

function UserDataCard() {
  const [login, setLogin] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const user_id = localStorage.getItem("user_id");

  useEffect(() => {
    if (!user_id) return;
    APIGet_AccountUserByUser_ID(user_id)
      .then(data => {
        if (!data.error) {
          setLogin(data.login || "");
          setName(data.name || "");
          setPassword(data.password || "");
          setRole(data.role || "user");
        } else {
          setMessage(`Erro ao carregar usuário: ${data.error}`);
        }
      })
      .catch(err => {
        console.error(err);
        setMessage("Erro ao carregar dados do usuário");
      });
  }, [user_id]);

  const handleUpdate = async () => {
    try {
      const data = await APIPut_AccountUser(user_id, name, password, login, role);
      if (data.error) setMessage(`Erro: ${data.error}`);
      else setMessage("Usuário atualizado com sucesso!");
    } catch (err) {
      console.error(err);
      setMessage("Erro ao atualizar usuário");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Deseja realmente deletar sua conta?")) return;
    try {
      const data = await APIDelete_AccountUser(user_id);
      if (data.error) setMessage(`Erro: ${data.error}`);
      else {
        setMessage("Usuário deletado com sucesso!");
        localStorage.removeItem("user_id");
        window.location.href = "/login";
      }
    } catch (err) {
      console.error(err);
      setMessage("Erro ao deletar usuário");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    window.location.href = "/login";
  };

  return (
    <div id="user-card">
      <div className="button-group">
        <button onClick={handleUpdate}>Atualizar</button>
        <button onClick={handleDelete}>Deletar</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <label>Login: </label>
      <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
      <br />

      <label>Nome: </label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <br />

      <label>Senha: </label>
      <div className="password-input">
        <input 
          type={showPassword ? "text" : "password"} 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <span className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </span>
      </div>
      <br />

      <label>Tipo de Usuário: </label>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">Usuário</option>
        <option value="admin">Administrador</option>
      </select>
      <br />

      {message && <p id="pokemon-message">{message}</p>}
    </div>
  );
}

export default UserDataCard;
