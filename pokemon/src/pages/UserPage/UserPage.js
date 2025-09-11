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

  /* ------------------- USEEFFECT - CARREGAR DADOS ------------------- */
  useEffect(() => {
    if (user_id) {
      api_account_user.APIGet_AccountUserByUser_ID(user_id).then(data => {
        if (data) {
          setLogin(data.login);
          setPassword(data.password);
          setName(data.name);
          setRole(data.role);
        } else {
          setMessage("Erro ao carregar dados do usuário.");
        }
      });

      api_owner_pokemon.APIGet_AllOwnerPokemon(user_id).then(data => {
        if (data) setPokemons(data);
      });

      api_user_bag.APIGet_AllUserBag(user_id).then(data => {
        if (data) setUserBag(data);
      });
    }
  }, [user_id]);

  /* ------------------- FUNÇÕES ------------------- */
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
        setMessage(`Apelido do Pokémon atualizado!`);
        setPokemons(prev =>
          prev.map(p => p.pokemon_id === pokemon_id ? { ...p, pokemon_name: newName } : p)
        );
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
        setMessage(`Pokémon removido!`);
        setPokemons(prev => prev.filter(p => p.pokemon_id !== pokemon_id));
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

  /* ------------------- RENDER ------------------- */
  return (
    <div id="user-page">
      <main id="main-user">
        <section id="user-card">
          <h2 id="section-title">Dados do Usuário</h2>
          <Cash_Balance user_id={user_id} />
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

        <section id="pokemon-card">
          <h2 id="section-title">Pokémons Capturados</h2>
          <PokemonList
            pokemons={pokemons}
            setPokemons={setPokemons}
            onUpdatePokemonName={handleUpdatePokemonName}
            onDeletePokemon={handleDeletePokemon}
          />
        </section>

        <section id="bag-card">
          <h2 id="section-title">Itens Comprados</h2>
          <BagList userBag={userBag} />
        </section>
      </main>
    </div>
  );
}

export default UserPage;
