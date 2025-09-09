// src/components/internal_api/cash_audit.js
const baseURL = "http://127.0.0.1:5000";

/*------------------- API com a tabela CashAudit ---------------------------*/

// GET: puxar todas as operações de um usuário
export function APIGet_AllCashAudit(user_id) {
  return fetch(`${baseURL}/cash_audit/user_id?user_id=${user_id}`)
    .then(response => response.json())
    .then(data => data);
}

// POST: adicionar nova operação de cash
export function APIPost_CashAudit(user_id, operation_type, value) {
  return fetch(`${baseURL}/cash_audit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: parseInt(user_id),
      operation_type: String(operation_type), // "entrada" ou "saida"
      value: Number(value)
    })
  })
  .then(response => response.json())
  .then(data => data);
}

// PUT: atualizar dados de uma operação
export function APIPut_CashAudit(cash_id, user_id, operation_type, value) {
  return fetch(`${baseURL}/cash_audit`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cash_id: parseInt(cash_id),
      user_id: parseInt(user_id),
      operation_type: String(operation_type),
      value: Number(value)
    })
  })
  .then(response => response.json())
  .then(data => data);
}

// DELETE: remover operação de cash
export function APIDelete_CashAudit(cash_id) {
  return fetch(`${baseURL}/cash_audit`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cash_id: parseInt(cash_id)
    })
  })
  .then(response => response.json())
  .then(data => data);
}
