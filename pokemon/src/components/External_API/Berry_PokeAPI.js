const baseURL = "https://pokeapi.co/api/v2";

/*------------------- BERRIES ---------------------------*/

// Retorna um berry específico pelo ID ou nome
export function APIGetBerry() {
  return fetch(`${baseURL}/berry`)
    .then(response => response.json())
    .then(data => data.results);
}
