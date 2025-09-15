import React from "react";

function UserDataCard({
  login, setLogin,
  password, setPassword,
  name, setName,
  role, setRole,
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

      <label>Login: </label>
      <input type="text" value={login} onChange={e => setLogin(e.target.value)} />
      <br></br>

      <label>Nome: </label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} />
      <br></br>

      <label>Senha: </label>
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      <br></br>

      <label>Tipo de Usuário: </label>
      <select value={role} onChange={e => setRole(e.target.value)}>
        <option value="user">Usuário</option>
        <option value="admin">Administrador</option>
      </select>
      <br></br>

      {message && <p id="pokemon-message">{message}</p>}
    </div>
  );
}

export default UserDataCard;
