import React from "react";

function BagList({ userBag }) {
  return (
    <div className="user-bag">
      <h1>Itens Comprados (Bag)</h1>
      {userBag.length === 0 ? (
        <p>Você ainda não comprou nenhum item.</p>
      ) : (
        <div className="bag-grid">
          {userBag.map(item => (
            <div key={item.bag_id} className="bag-card">
              <p><strong>ID do Item:</strong> {item.item_id}</p>
              <p><strong>Operação:</strong> {item.operation_type}</p>
              {item.pokemon_id && (
                <p><strong>Pokémon Vinculado:</strong> {item.pokemon_id}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BagList;
