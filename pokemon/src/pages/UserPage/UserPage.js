import React, { useEffect, useState } from "react";
import "./UserPage.css";
import * as api_account_user from "../../components/internal_api/account_user";
import * as api_owner_pokemon from "../../components/internal_api/owner_pokemon";
import * as api_cash_audit from "../../components/internal_api/cash_audit";
import * as api_user_bag from "../../components/internal_api/user_bag";
import { useNavigate } from "react-router-dom";

// Componentes
import UserDataCard from "./components/UserDataCard";
import PokemonList from "./components/PokemonList";
import BagList from "./components/BagList";

function UserPage() {
  const navigate = useNavigate();

  // Estados principais
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const [pokemons, setPokemons] = useState([]);
  const [cashAudit, setCashAudit] = useState([]);
  const [balance, setBalance] = useState(0);
  const [userBag, setUserBag] = useState([]);

  const user_id = localStorage.getItem("user_id");

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

      api_cash_audit.APIGet_AllCashAudit(user_id).then(data => {
        if (data) {
          setCashAudit(data);
          updateBalance(data);
        }
      });

      api_user_bag.APIGet_AllUserBag(user_id).then(data => {
        if (data) setUserBag(data);
      });
    }
  }, [user_id]);

  /* ------------------- FUNÇÕES AUXILIARES ------------------- */

  // Atualizar saldo
  const updateBalance = (cashData) => {
    const saldo = cashData.reduce((acc, item) => {
      return item.operation_type === "input"
        ? acc + Number(item.value)
        : acc - Number(item.value);
    }, 0);
    setBalance(saldo);
  };

  // Atualizar apelido do Pokémon
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

  // Remover Pokémon
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

  /* ------------------- FUNÇÕES DE USUÁRIO ------------------- */

  const handleUpdate = async () => {
    try {
      const data = await api_account_user.APIPut_AccountUser(user_id, login, password, name, role);
      if (data && data.user_id) setMessage("Usuário atualizado com sucesso!");
      else setMessage(data.message || "Erro ao atualizar usuário.");
    } catch (error) {
      setMessage("Erro de conexão.");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Deseja realmente deletar sua conta?")) return;
    try {
      const data = await api_account_user.APIDelete_AccountUser(user_id);
      if (data && data.user_id) {
        setMessage("Usuário deletado com sucesso!");
        localStorage.removeItem("user_id");
        navigate("/");
        window.location.reload();
      } else setMessage(data.message || "Erro ao deletar usuário.");
    } catch (error) {
      setMessage("Erro de conexão.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/");
    window.location.reload();
  };

  /* ------------------- RENDER ------------------- */
  return (
    <div className="user-page">
      <main className="main-user">
        {/* Dados do usuário */}
        <UserDataCard
          login={login}
          setLogin={setLogin}
          password={password}
          setPassword={setPassword}
          name={name}
          setName={setName}
          role={role}
          setRole={setRole}
          balance={balance}
          message={message}
          handleUpdate={handleUpdate}
          handleDelete={handleDelete}
          handleLogout={handleLogout}
        />

        <hr />

        {/* Lista de Pokémons */}
        <PokemonList
          pokemons={pokemons}
          setPokemons={setPokemons}
          onUpdatePokemonName={handleUpdatePokemonName}
          onDeletePokemon={handleDeletePokemon}
        />

        <hr />

        {/* Lista de Itens Comprados */}
        <BagList userBag={userBag} />
      </main>
    </div>
  );
}

export default UserPage;
