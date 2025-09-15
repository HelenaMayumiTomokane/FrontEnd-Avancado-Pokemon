import React, { useEffect, useState } from "react";
import * as api_cash_audit from "../Internal_API/Cash_Audit";

function Cash_Balance({ user_id, trigger }) {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (!user_id) return;

    const fetchBalance = async () => {
      try {
        const data = await api_cash_audit.APIGet_AllCashAudit(user_id);
        if (data) {
          const saldo = data.reduce((acc, item) => {
            return item.operation_type === "input"
              ? acc + Number(item.value)
              : acc - Number(item.value);
          }, 0);
          setBalance(saldo);
        }
      } catch (error) {
        console.error("Erro ao carregar saldo:", error);
      }
    };

    fetchBalance();
  }, [user_id, trigger]); // <- adicionamos trigger aqui

  return (
    <div id="balance-box">
      <p>
        <strong>Saldo:</strong> {balance} cash
      </p>
    </div>
  );
}

export default Cash_Balance;
