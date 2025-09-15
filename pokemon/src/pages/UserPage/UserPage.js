import React, { useEffect, useState } from "react";
import "./UserPage.css";
import * as api_account_user from "../../components/Internal_API/Account_User";
import * as api_owner_pokemon from "../../components/Internal_API/Owner_Pokemon";
import * as api_user_bag from "../../components/Internal_API/User_Bag";
import { useNavigate } from "react-router-dom";

import UserDataCard from "./components/UserDataCard";
import PokemonList from "./components/PokemonList";
import BagList from "./components/BagList";
import Cash_Balance from "../../components/Shared/Cash_Balance";

function UserPage() {
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const [pokemons, setPokemons] = useState([]);
  const [userBag, setUserBag] = useState([]);
  const [balanceTrigger, setBalanceTrigger] = useState(0);

  useEffect(() => {
    if (!user_id) {
      navigate("/");
      return;
    }

    const loadData = async () => {
      try {
        const userData = await api_account_user.APIGet_AccountUserByUser_ID(user_id);
        if (userData) {
          setLogin(userData.login);
          setPassword(userData.password);
          setName(userData.name);
          setRole(userData.role);
        }

        const pokemonsData = await api_owner_pokemon.APIGet_AllOwnerPokemon(user_id);
        if (pokemonsData) setPokemons(pokemonsData);

        const bagData = await api_user_bag.APIGet_AllUserBag(user_id);
        if (bagData) setUserBag(bagData);
      } catch (error) {
        console.error(error);
        setMessage("Erro ao carregar dados do usuário.");
      }
    };

    loadData();
  }, [user_id, navigate]);

  const handleUpdatePokemonName = async (pokemon_id, newName) => {
    try {
      const pokemon = pokemons.find(p => p.pokemon_id === pokemon_id);
      const data = await api_owner_pokemon.APIPut_OwnerPokemon(
        pokemon_id,
        user_id,
        pokemon.pokemon_species,
        pokemon.pokemon_id_external_api,
        newName
      );

      if (data && data.pokemon_id) {
        setPokemons(prev =>
          prev.map(p => p.pokemon_id === pokemon_id ? { ...p, pokemon_name: newName } : p)
        );
        setMessage(`Apelido do Pokémon atualizado!`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Erro ao atualizar apelido do Pokémon.");
    }
  };

  const handleDeletePokemon = async (pokemon_id) => {
    if (!window.confirm("Deseja realmente remover este Pokémon?")) return;

    try {
      const data = await api_owner_pokemon.APIDelete_OwnerPokemon(pokemon_id);
      if (data && data.pokemon_id) {
        setPokemons(prev => prev.filter(p => p.pokemon_id !== pokemon_id));
        setMessage("Pokémon removido!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erro ao remover Pokémon.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/");
    window.location.reload();
  };

  return (
    <div id="user-page">
      <main id="main-user">
        
        {/* Coluna esquerda */}
        <div id="left-section">
          {/* Pokémon Capturados */}
          <section id="pokemon-card" className="card">
            <h2>Pokémons Capturados</h2>
              {pokemons.length > 0 ? (
                <PokemonList
                  pokemons={pokemons}
                  setPokemons={setPokemons}
                  onUpdatePokemonName={handleUpdatePokemonName}
                  onDeletePokemon={handleDeletePokemon}
                />
              ) : (
                <p className="message">Você ainda não capturou nenhum Pokémon!</p>
              )}

          </section>

          {/* Itens da Bag */}
          <section className="card">
            <h2>Itens Comprados</h2>
              {userBag.length > 0 ? (
                <BagList userBag={userBag} setUserBag={setUserBag} pokemons={pokemons} />
              ) : (
                <p className="message">Sua bag está vazia!</p>
              )}
          </section>
        </div>

        {/* Coluna direita */}
        <div id="right-section">
          {/* Dados do Usuário */}
          <section id="user-card" className="card">
            <h2>Dados do Usuário</h2>
            <Cash_Balance user_id={user_id} trigger={balanceTrigger} />


            <UserDataCard
              login={login}
              setLogin={setLogin}
              password={password}
              setPassword={setPassword}
              name={name}
              setName={setName}
              role={role}
              setRole={setRole}
              message={message}
              handleLogout={handleLogout}
            />
          </section>
        </div>
      </main>
    </div>
  );
}

export default UserPage;
