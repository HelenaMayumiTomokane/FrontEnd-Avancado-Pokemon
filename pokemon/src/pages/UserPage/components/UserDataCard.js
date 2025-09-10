import React from "react";

function UserDataCard({
  login, setLogin,
  password, setPassword,
  name, setName,
  role, setRole,
  balance,
  message,
  handleUpdate,
  handleDelete,
  handleLogout
}) {
  return (
    <div id="user-card">
      <div>
        <button onClick={handleUpdate}>Atualizar</button>
        <button onClick={handleDelete}>Deletar</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <br />

      <label>Login:</label>
      <input type="text" value={login} onChange={e => setLogin(e.target.value)} />

      <label>Nome:</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />

      <label>Senha:</label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />

      <label>Tipo de Usuário:</label>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">Usuário</option>
        <option value="admin">Administrador</option>
      </select>

      {/* Saldo de cash */}
      <div id="cash-balance">
        <h3>Saldo de Cash: {balance}</h3>
      </div>

      {message && <p id="pokemon-message">{message}</p>}
    </div>
  );
}

export default UserDataCard;
