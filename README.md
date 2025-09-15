# FrontEnd Avançado Pokémon

## 🎮 Descrição

Este projeto é uma aplicação web que permite aos usuários buscar e visualizar informações detalhadas sobre Pokémons usando a [PokéAPI](https://pokeapi.co/).  
A interface é responsiva, intuitiva e focada na experiência do usuário, exibindo dados como nome e tipo.

---

## 🚀 Funcionalidades

### 1. Busca de Pokémons
- Pesquisar Pokémons por nome ou ID (`GET`)
- Visualizar detalhes completos de cada Pokémon

### 2. Componentes de Interface
- Cards de Pokémons
- Barra de pesquisa interativa
- Interface responsiva para desktop e dispositivos móveis

### 3. Serviços
- Comunicação com a PokéAPI para obter dados em tempo real
- Serviços organizados para facilitar manutenção e escalabilidade

### 4. Testes
- Testes unitários dos principais componentes da interface

---

## 🛠️ Tecnologias Utilizadas
- ⚛️ React (JavaScript) para a interface e consumo da API.
- 🖼️ HTML/CSS para layout e estilo.
- 📦 Node.js / npm para gerenciamento de pacotes do frontend.
- 🧪 API Externa: [PokéAPI](https://pokeapi.co/)  

---

## 📁 Estrutura do Projeto

```plaintext
FrontEnd-Avancado-Pokemon/
│
├── Dockerfile                   # Configuração do container Docker para frontend
├── README.md                    # Documentação do projeto
├── requirements.txt             # Dependências do projeto
│
├── pokemon/                     # Pasta principal do módulo Pokémon
│   │
│   ├── public/                  # Arquivos públicos estáticos
│   │   └── index.html           # HTML principal
│   │
│   └── src/                     # Código fonte do frontend
│       ├── App.js               # Componente raiz da aplicação
│       ├── index.js             # Ponto de entrada do React
│       ├── index.css            # Estilos globais
│       ├── reportWebVitals.js   # Métricas de performance
│       └── setupTests.js        # Configuração de testes
│
│       ├── Image/               # Recursos de imagens
│       │   └── logo.png         # Logo do projeto
│       │
│       ├── components/          # Componentes reutilizáveis
│       │   ├── External_API/    # Componentes que consomem API externa (PokéAPI)
│       │   │   ├── Berry_PokeAPI.js
│       │   │   └── Habitat_PokeAPI.js
│       │   │
│       │   ├── Footer/          # Rodapé da aplicação
│       │   │   ├── Footer.js
│       │   │   └── Footer.css
│       │   │
│       │   ├── Header/          # Cabeçalho da aplicação
│       │   │   ├── Header.js
│       │   │   └── Header.css
│       │   │
│       │   ├── Internal_API/    # Componentes que consomem APIs internas
│       │   │   ├── Account_User.js
│       │   │   ├── Cash_Audit.js
│       │   │   ├── Owner_Pokemon.js
│       │   │   └── User_Bag.js
│       │   │
│       │   └── Shared/          # Componentes compartilhados
│       │       └── Cash_Balance.js
│       │
│       ├── services/            # Serviços para comunicação com APIs
│       │   └── pokemonService.js
│       │
│       └── pages/               # Páginas da aplicação
│           ├── HabitatPage/
│           │   ├── HabitatPage.js
│           │   └── HabitatPage.css
│           │
│           ├── Home/
│           │   ├── Home.js
│           │   └── Home.css
│           │
│           ├── Login/
│           │   ├── LoginPage.js
│           │   └── LoginPage.css
│           │
│           ├── MiniGamesPage/
│           │   ├── MiniGamesPage.js
│           │   └── MiniGamesPage.css
│           │
│           ├── NotFound/
│           │   ├── NotFound.js
│           │   └── NotFound.css
│           │
│           ├── PokemonPage/
│           │   ├── PokemonPage.js
│           │   └── PokemonPage.css
│           │
│           ├── RegisterUser/
│           │   ├── RegisterUser.js
│           │   └── RegisterUser.css
│           │
│           ├── ShopPage/
│           │   ├── ShopPage.js
│           │   └── ShopPage.css
│           │
│           └── UserPage/
│               ├── UserPage.js
│               └── UserPage.css
│

```
---


## ⚙️ Instalação e Execução

Pré-requisitos
Node.js (v14 ou superior)
npm


Passos
1. Clone o repositório:
git clone https://github.com/HelenaMayumiTomokane/FrontEnd-Avancado-Pokemon.git

2. Acesse a pasta do projeto:
cd FrontEnd-Avancado-Pokemon

3. Instale as dependências:
npm install

4. Execute a aplicação:
npm start

A aplicação estará disponível em: http://localhost:3000/
E para parar a execução pressione: Ctrl + C

## 🌐 APIs Externas

A aplicação consome dados da [PokéAPI](https://pokeapi.co/), utilizando os seguintes endpoints:

### Base URL
https://pokeapi.co/api/v2



### Endpoints Utilizados

#### 1. Berries
- `/berry/` → Retorna a lista de todas as berries.

#### 2. Habitats
- `/pokemon-habitat/` → Retorna a lista de todos os habitats de Pokémon.
- `/pokemon-habitat/{nome}/` → Retorna todos os Pokémons de um habitat específico.




💡 Caso tenha dúvidas ou encontre problemas, consulte a documentação ou abra uma issue no repositório! 🚀