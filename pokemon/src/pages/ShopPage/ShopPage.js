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

  /* ------------------- USEEFFECT ------------------- */
  useEffect(() => {
    if (user_id) {
      // Pega o saldo
      api_cash_audit.APIGet_AllCashAudit(user_id).then((data) => {
        if (data) {
          const saldo = data.reduce((acc, item) => {
            return item.operation_type === "input"
              ? acc + Number(item.value)
              : acc - Number(item.value);
          }, 0);
          setBalance(saldo);
        }
      });

      // Pega as berries
      const fetchItems = async () => {
        try {
          const results = await api_external_berry.APIGetBerry();
          setItems(
            results.map((b) => ({
              ...b,
              price: Math.floor(Math.random() * 41) + 10,
            }))
          );
        } catch (err) {
          console.error(err);
        }
      };
      fetchItems();
    }
  }, [user_id]);

  /* ------------------- FUNÇÕES ------------------- */
  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setMessage(`${item.name} adicionado ao carrinho!`);
  };

  const handleRemoveFromCart = (index) =>
    setCart((prev) => prev.filter((_, i) => i !== index));

  const handleCheckout = async () => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    if (total > balance) {
      setMessage("Saldo insuficiente para finalizar o carrinho!");
      return;
    }

    try {
      for (let item of cart) {
        await api_user_bag.APIPost_UserBag(user_id, "input", item.name, null);
        await api_cash_audit.APIPost_CashAudit(user_id, "output", item.price);
      }

      setBalance((prev) => prev - total);
      setCart([]);
      setMessage(`Compra realizada! Você gastou ${total} cash.`);
    } catch (err) {
      console.error(err);
      setMessage("Erro ao finalizar a compra.");
    }
  };

  /* ------------------- RENDER ------------------- */
  return (
    <div id="shop-page">
      <header id="shop-header">
        <h1>Loja de Berries</h1>
        <div id="balance-box">
          <p>
            <strong>Saldo:</strong> {balance} cash
          </p>
        </div>
      </header>

      {message && <div id="shop-message">{message}</div>}

      <div id="shop-grid">
        {items.map((item) => (
          <div key={item.id} id="shop-card">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
              alt={item.name}
              id="shop-item-image"
              onError={(e) => (e.target.style.display = "none")}
            />
            <h4>{item.name}</h4>
            <p id="price">{item.price} cash</p>
            <button id="add-to-cart-btn" onClick={() => handleAddToCart(item)}>
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div id="cart-section">
          <h2>🛒 Carrinho</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <span>{item.name}</span>
                <span>{item.price} cash</span>
                <button id="remove-btn" onClick={() => handleRemoveFromCart(index)}>
                  ✖
                </button>
              </li>
            ))}
          </ul>
          <div id="cart-footer">
            <p>
              Total:{" "}
              <strong>{cart.reduce((acc, item) => acc + item.price, 0)} cash</strong>
            </p>
            <button id="checkout-btn" onClick={handleCheckout}>
              Finalizar Compra
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShopPage;
