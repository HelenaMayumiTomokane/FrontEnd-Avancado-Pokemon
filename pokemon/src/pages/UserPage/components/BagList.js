import React, { useState } from "react";
import * as api_user_bag from "../../../components/Internal_API/User_Bag";

function BagList({ userBag, pokemons, setUserBag }) {
  const user_id = localStorage.getItem("user_id");
  const [selectedPokemon, setSelectedPokemon] = useState({});

  // Função para recarregar toda a bag do banco
  const reloadBag = async () => {
    try {
      const bagData = await api_user_bag.APIGet_AllUserBag(user_id);
      if (bagData) setUserBag(bagData);
    } catch (error) {
      console.error("Erro ao recarregar bag:", error);
    }
  };

  // Agrupar itens por item_id considerando input e output
  const groupedBag = userBag.reduce((acc, item) => {
    if (!acc[item.item_id] && item.operation_type !== "output") {
      acc[item.item_id] = { ...item, quantity: 1 };
    } else if (item.operation_type === "input") {
      acc[item.item_id].quantity += 1;
    } else {
      acc[item.item_id].quantity -= 1;
    }
    return acc;
  }, {});

  const groupedArray = Object.values(groupedBag).filter(item => item.quantity > 0);

  const handleUseItem = async (item_id) => {
    const pokemon_id = selectedPokemon[item_id];
    if (!pokemon_id) {
      alert("Selecione um Pokémon antes de usar o item!");
      return;
    }

    try {
      const response = await api_user_bag.APIPost_UserBag(
        user_id,
        "output",
        item_id,
        pokemon_id
      );

      if (response.bag_id) {
        alert(`Item "${item_id}" usado no Pokémon com sucesso!`);

        // Recarrega a bag inteira após o POST
        await reloadBag();
      } else {
        alert("Não foi possível usar o item.");
      }
    } catch (error) {
      console.error("Erro ao usar item:", error);
      alert("Erro ao tentar usar o item.");
    }
  };

  return (
    <div id="user-bag">
      {groupedArray.length === 0 ? (
        <p className="empty-bag">Você ainda não comprou nenhum item.</p>
      ) : (
        <div className="bag-grid">
          {groupedArray.map((groupedItem) => (
            <div key={groupedItem.item_id} className="bag-card">
              <h3 className="bag-card-title">{groupedItem.item_id}</h3>
              <p className="bag-card-quantity">
                <strong>Quantidade:</strong> {groupedItem.quantity}
              </p>

              <select
                className="pokemon-select"
                value={selectedPokemon[groupedItem.item_id] || ""}
                onChange={(e) =>
                  setSelectedPokemon({
                    ...selectedPokemon,
                    [groupedItem.item_id]: e.target.value,
                  })
                }
              >
                <option value="">Selecione um Pokémon</option>
                {pokemons.map((pokemon) => (
                  <option key={pokemon.pokemon_id} value={pokemon.pokemon_id}>
                    {pokemon.pokemon_name || pokemon.nickname}
                  </option>
                ))}
              </select>

              <button
                className="use-button"
                onClick={() => handleUseItem(groupedItem.item_id)}
                disabled={groupedItem.quantity <= 0}
              >
                Usar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BagList;
