import React, { useState } from "react";
import "./RegisterUser.css"; // Importando o CSS separado

function RegisterUser() {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
    name: "",
    role: "user",
  });

  const [message, setMessage] = useState("");

  // Atualiza os inputs dinamicamente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Envia os dados para o backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/account_user/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Usuário criado com sucesso! ID: ${data.user_id}`);
        setFormData({ login: "", password: "", name: "", role: "user" });
      } else {
        setMessage(data.message || "Erro ao criar usuário.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMessage("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="register-container">
      <h2>Criar Novo Usuário</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <label>Login:</label>
        <input
          type="text"
          name="login"
          value={formData.login}
          onChange={handleChange}
          required
        />

        <label>Nome:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Senha:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label>Tipo de Usuário:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>

        <button type="submit">Cadastrar</button>
      </form>

      {message && <p className="register-message">{message}</p>}
    </div>
  );
}

export default RegisterUser;
