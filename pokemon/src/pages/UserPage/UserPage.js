import React, { useEffect, useState } from "react";
import "./UserPage.css";
import * as api_account_user from "../../components/internal_api/account_user";
import * as api_owner_pokemon from "../../components/internal_api/owner_pokemon";
import * as api_cash_audit from "../../components/internal_api/cash_audit";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const [pokemons, setPokemons] = useState([]); // lista de pokemons do usuário
  const [cashAudit, setCashAudit] = useState([]); // histórico de cash
  const [balance, setBalance] = useState(0); // saldo de cash
  const user_id = localStorage.getItem("user_id");

  // Puxar dados do usuário, Pokémon e cash
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
    }
  }, [user_id]);

  // Função para consolidar saldo
  const updateBalance = (cashData) => {
    const saldo = cashData.reduce((acc, item) => {
      return item.operation_type === "input"
        ? acc + Number(item.value)
        : acc - Number(item.value);
    }, 0);
    setBalance(saldo);
  };

  // Atualizar usuário
  const handleUpdate = async () => {
    try {
      const data = await api_account_user.APIPut_AccountUser(user_id, login, password, name, role);
      if (data && data.user_id) setMessage("Usuário atualizado com sucesso!");
      else setMessage(data.message || "Erro ao atualizar usuário.");
    } catch (error) { setMessage("Erro de conexão."); }
  };

  // Deletar usuário
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
    } catch (error) { setMessage("Erro de conexão."); }
  };

  // Logout
  const handleLogout = () => { 
    localStorage.removeItem("user_id"); 
    navigate("/"); 
    window.location.reload();
  };

  // Atualizar apelido (name) do Pokémon
  const handleUpdatePokemonName = async (pokemon_id, newName) => {
    try {
      const pokemon = pokemons.find(p => p.pokemon_id === pokemon_id);
      const data = await api_owner_pokemon.APIPut_OwnerPokemon(
        pokemon_id, 
        user_id, 
        pokemon.pokemon_species, // não altera a espécie
        pokemon.pokemon_id_external_api,
        newName // só altera o name
      );
      if (data && data.pokemon_id) {
        setMessage(`Apelido do Pokémon atualizado!`);
        setPokemons(prev => prev.map(p => p.pokemon_id === pokemon_id ? {...p, pokemon_name: newName} : p));
      }
    } catch (error) {
      console.error(error);
      setMessage("Erro ao atualizar apelido do Pokémon.");
    }
  };

  // Deletar Pokémon
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

  return (
    <div className="user-page">
      <main className="main-user">
        <div className="user-card">
          <h1>Dados do Usuário</h1>
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
          <div className="cash-balance">
            <h3>Saldo de Cash: {balance}</h3>
          </div>

          {message && <p className="pokemon-message">{message}</p>}
        </div>

        <hr />

        <div className="user-pokemon">
          <h1>Pokémon Domesticados</h1>
          <div className="pokemon-grid">
            {pokemons.map(pokemon => (
              <div key={pokemon.pokemon_id} className="pokemon-card">
                <img 
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.pokemon_id_external_api}.png`} 
                  alt={pokemon.pokemon_species} 
                />
                <div>
                  <label>ID Interno:</label> {pokemon.pokemon_id}<br />
                  <label>ID API:</label> {pokemon.pokemon_id_external_api}<br />
                  <label>Espécie:</label> {pokemon.pokemon_species}<br />
                  <label>Apelido:</label>
                  <input 
                    type="text" 
                    value={pokemon.pokemon_name} 
                    onChange={e => setPokemons(prev => prev.map(p => p.pokemon_id === pokemon.pokemon_id ? {...p, pokemon_name: e.target.value} : p))}
                  />
                </div>
                <div>
                  <button onClick={() => handleUpdatePokemonName(pokemon.pokemon_id, pokemon.pokemon_name)}>Alterar Apelido</button>
                  <button onClick={() => handleDeletePokemon(pokemon.pokemon_id)}>Remover</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default UserPage;
