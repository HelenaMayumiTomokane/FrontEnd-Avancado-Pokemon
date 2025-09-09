// src/components/internal_api/user_bag.js
const baseURL = "http://127.0.0.1:5000";

/*------------------- API com a tabela UserBag ---------------------------*/

// GET: puxar todos os itens da bag de um usuário
export function APIGet_AllUserBag(user_id) {
  return fetch(`${baseURL}/user_bag/user_id?user_id=${user_id}`)
    .then(response => response.json())
    .then(data => data);
}

// POST: adicionar item na bag do usuário
export function APIPost_UserBag(user_id, operation_type,item_id,pokemon_id) {
  return fetch(`${baseURL}/user_bag`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: parseInt(user_id),
      item_id: String(item_id),
      operation_type: String(operation_type),
      pokemon_id:pokemon_id
    })
  })
  .then(response => response.json())
  .then(data => data);
}

// PUT: atualizar item na bag do usuário
export function APIPut_UserBag(bag_id, user_id,operation_type,item_id) {
  return fetch(`${baseURL}/user_bag`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bag_id: parseInt(bag_id),
      user_id: parseInt(user_id),
      item_id: String(item_id),
      operation_type: String(operation_type)
    })
  })
  .then(response => response.json())
  .then(data => data);
}

// DELETE: remover item da bag do usuário
export function APIDelete_UserBag(bag_id) {
  return fetch(`${baseURL}/user_bag`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      bag_id: parseInt(bag_id)
    })
  })
  .then(response => response.json())
  .then(data => data);
}
