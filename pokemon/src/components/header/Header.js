import React from "react";
import "./Header.css";
import logo from "../../Image/logo.png";

function Header() {
  const userId = localStorage.getItem("user_id"); // verifica se o usuário está logado

  return (
    <header className="header">
      <div className="header-logo">
        <a href="/">
          <img src={logo} alt="Pokemon Logo" className="logo" />
        </a>
        <h1>Mundo Pokémon</h1>
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
        {userId && <a href="/shoppage">Shop</a>}
        {userId && <a href="/minigames">Games</a>}
      </nav>
    </header>
  );
}

export default Header;
