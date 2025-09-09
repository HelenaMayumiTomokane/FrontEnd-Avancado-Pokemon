import React, { useEffect, useState } from "react";
import "./ShopPage.css";
import * as api_cash_audit from "../../components/internal_api/cash_audit";
import * as api_user_bag from "../../components/internal_api/user_bag";
import * as api_external_berry from "../../components/external_api/pokeapi/berry";

function ShopPage() {
  const user_id = localStorage.getItem("user_id");
  const [balance, setBalance] = useState(0);
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");

  // Puxar saldo e berries
  useEffect(() => {
    if (user_id) {
      // saldo
      api_cash_audit.APIGet_AllCashAudit(user_id).then(data => {
        if (data) {
          const saldo = data.reduce((acc, item) => {
            return item.operation_type === "input"
              ? acc + Number(item.value)
              : acc - Number(item.value);
          }, 0);
          setBalance(saldo);
        }
      });

      // berries
      const fetchItems = async () => {
        try {
          const results = await api_external_berry.APIGetBerry();
          // adiciona preço aleatório 10-50
          setItems(results.map(b => ({
            ...b,
            price: Math.floor(Math.random() * 41) + 10 // preço aleatório 10-50
          })));
        } catch (err) {
          console.error(err);
        }
      };
      fetchItems();
    }
  }, [user_id]);

  // Adicionar ao carrinho
  const handleAddToCart = (item) => setCart(prev => [...prev, item]);

  // Remover do carrinho
  const handleRemoveFromCart = (index) => setCart(prev => prev.filter((_, i) => i !== index));

  // Finalizar compra
  const handleCheckout = async () => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);
    if (total > balance) {
      setMessage("Saldo insuficiente para finalizar o carrinho!");
      return;
    }

    try {
      for (let item of cart) {
        // 2) Adicionar na UserBag com item_id e item_name
        await api_user_bag.APIPost_UserBag(user_id,"input",item.name,null);
        // 1) Debitar cash
        await api_cash_audit.APIPost_CashAudit(user_id, "output", item.price);
      }

      setBalance(prev => prev - total);
      setMessage(`Compra realizada! Gastou ${total} cash e itens adicionados à sua bag.`);
      setCart([]);
    } catch (err) {
      console.error(err);
      setMessage("Erro ao finalizar a compra.");
    }
  };

  return (
    <div className="shop-page">
      <h1>Loja de Berries</h1>
      <h3>Saldo: {balance} cash</h3>
      {message && <p className="shop-message">{message}</p>}

      <div className="shop-grid">
        {items.map(item => (
          <div key={item.id} className="shop-card">
            <h4>{item.name}</h4>
            <p>Preço: {item.price} cash</p>
            <button onClick={() => handleAddToCart(item)}>Adicionar ao carrinho</button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="cart-section">
          <h2>Carrinho</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price} cash
                <button onClick={() => handleRemoveFromCart(index)}>Remover</button>
              </li>
            ))}
          </ul>
          <p>Total: {cart.reduce((acc, item) => acc + item.price, 0)} cash</p>
          <button onClick={handleCheckout}>Finalizar Compra</button>
        </div>
      )}
    </div>
  );
}

export default ShopPage;
