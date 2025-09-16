import React, { useEffect, useState } from "react";
import "./ShopPage.css";
import * as api_user_bag from "../../components/Internal_API/User_Bag";
import * as api_external_berry from "../../components/External_API/Berry_PokeAPI";
import * as api_cash_audit from "../../components/Internal_API/Cash_Audit";

import Cash_Balance from "../../components/Shared/Cash_Balance";

function ShopPage() {
  const user_id = localStorage.getItem("user_id");
  const [items, setItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState("");
  const [balanceTrigger, setBalanceTrigger] = useState(0);

  // Controle do botão de cancelamento
  const [cancelAvailable, setCancelAvailable] = useState(false);
  const [cancelTimer, setCancelTimer] = useState(30);

  useEffect(() => {
    if (!user_id) return;

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
  }, [user_id]);

  const handleAddToCart = (item) => {
    setCart((prev) => [...prev, item]);
    setMessage(`${item.name} adicionado ao carrinho!`);
  };

  const handleRemoveFromCart = (index) =>
    setCart((prev) => prev.filter((_, i) => i !== index));

  // Finaliza a compra
  const handleCheckout = async () => {
    const total = cart.reduce((acc, item) => acc + item.price, 0);

    if (total > 0) {
      try {
        const bagIds = [];
        const cashIds = [];

        for (let item of cart) {
          // Adiciona item na bag do usuário
          const bagResponse = await api_user_bag.APIPost_UserBag(
            user_id,
            "input",
            item.name,
            null
          );
          bagIds.push(bagResponse.bag_id);

          // Desconta o valor do item do saldo do usuário
          const cashResponse = await api_cash_audit.APIPost_CashAudit(
            user_id,
            "output",
            item.price
          );
          cashIds.push(cashResponse.cash_id);
        }

        // Salva os IDs no localStorage
        localStorage.setItem("lastPurchase", JSON.stringify({ bagIds, cashIds }));

        // Libera o botão de cancelar compra
        setCancelAvailable(true);
        setCancelTimer(30);

        // Inicia contagem regressiva
        const countdown = setInterval(() => {
          setCancelTimer((prev) => {
            if (prev <= 1) {
              clearInterval(countdown);

              // Remove os dados do localStorage automaticamente
              localStorage.removeItem("lastPurchase");

              // Desativa o botão após os 30s
              setCancelAvailable(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        setCart([]);
        setMessage(`Compra realizada! Você gastou ${total} cash.`);
        setBalanceTrigger((prev) => prev + 1); // Atualiza saldo
      } catch (err) {
        console.error(err);
        setMessage("Erro ao finalizar a compra.");
      }
    }
  };

  // Cancela a compra
  const handleCancelPurchase = async () => {
    const lastPurchase = JSON.parse(localStorage.getItem("lastPurchase"));
    if (!lastPurchase) return;

    try {
      // Deleta os itens da bag
      for (let bag_id of lastPurchase.bagIds) {
        await api_user_bag.APIDelete_UserBag(bag_id);
      }

      // Deleta os registros de cash
      for (let cash_id of lastPurchase.cashIds) {
        await api_cash_audit.APIDelete_CashAudit(cash_id);
      }

      localStorage.removeItem("lastPurchase"); // Limpa os dados manualmente
      setMessage("Compra cancelada com sucesso! Seus itens e saldo foram revertidos.");
      setBalanceTrigger((prev) => prev + 1); // Atualiza saldo
      setCancelAvailable(false); // Oculta o botão após cancelar
    } catch (err) {
      console.error(err);
      setMessage("Erro ao cancelar a compra.");
    }
  };

  return (
    <div id="shop-page">
      <header id="shop-header">
        <h1>Loja de Berries</h1>
        <Cash_Balance user_id={user_id} trigger={balanceTrigger} />
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

      {/* Botão de Cancelar Compra */}
      {cancelAvailable && (
        <div id="cancel-section">
          <button id="cancel-btn" onClick={handleCancelPurchase}>
            Cancelar Compra ({cancelTimer}s)
          </button>
        </div>
      )}
    </div>
  );
}

export default ShopPage;
