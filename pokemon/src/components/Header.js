import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header style={{ backgroundColor: "#ff5757", padding: "10px", color: "white" }}>
      <h1>Pokémon App</h1>
      <nav>
        <Link to="/" style={{ color: "white", marginRight: "15px" }}>Home</Link>
        <Link to="/register" style={{ color: "white", marginRight: "15px" }}>Cadastro</Link>
        <Link to="/login" style={{ color: "white" }}>Login</Link>
      </nav>
    </header>
  );
}

export default Header;
