import React from "react";
import "./Header.css";

function Header() {
  const userId = localStorage.getItem("user_id"); // verifica se o usuário está logado

  return (
    <header className="header">
      <div className="header-logo">
        <img src="/images/pokemon-logo.png" alt="Pokemon Logo" className="logo" />
        <h1>Pokémon Manager</h1>
      </div>

      <nav className="header-nav">
        <a href="/">Home</a>
        {!userId && (
          <>
            <a href="/login">Login</a>
            <a href="/register">Cadastro</a>
          </>
        )}
        {userId && <a href="/user_page">Conta</a>}
      </nav>
    </header>
  );
}

export default Header;
