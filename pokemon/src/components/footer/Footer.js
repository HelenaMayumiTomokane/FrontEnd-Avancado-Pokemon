import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 Pokémon Manager. Todos os direitos reservados.</p>
      <p>
        Dados fornecidos pela{" "}
        <a href="https://pokeapi.co/" target="_blank" rel="noopener noreferrer">
          PokéAPI
        </a>
      </p>
      <p>
        Documentação do Projeto{" "}
        <a href="http://127.0.0.1:5000/openapi" target="_blank" rel="noopener noreferrer">
          OpenApi
        </a>
      </p>
    </footer>
  );
}

export default Footer;
