# FrontEnd Avançado Pokémon

## 📖 Descrição

Este projeto é uma aplicação web completa que permite aos usuários buscar, visualizar e gerenciar informações detalhadas sobre Pokémons utilizando a [PokéAPI](https://pokeapi.co/)
e um backend interno em Flask.

Seguindo esse formato para a organização de implementação dos módulos
```mermaid
flowchart LR
    DB[(Banco de Dados)] <--> BE[Backend - Flask API]
    BE <--> FE[Frontend - React]
    POKEAPI[PokeAPI - API Externa] --> BE

    classDef db fill:#FFD700,stroke:#333,stroke-width:2px,color:#000;
    classDef backend fill:#FFB347,stroke:#333,stroke-width:2px,color:#000;
    classDef frontend fill:#61DAFB,stroke:#333,stroke-width:2px,color:#000;
    classDef pokeapi fill:#FF6347,stroke:#333,stroke-width:2px,color:#fff;

    class DB db;
    class BE backend;
    class FE frontend;
    class POKEAPI pokeapi;


---

## 🚀 Funcionalidades

### 1. 🔍 Busca de Pokémons
- Pesquisar Pokémons por nome ou ID (`GET`)
- Exibição de dados como nome, tipo e apelidos dos Pokémons capturados.

### 2. 🖥️ Componentes de Interface
- Interface responsiva para desktop e dispositivos móveis
- Visualização de informações do usuário:
  - 🧑 Dados do usuário (login, nome, tipo)
  - 🎒 Itens comprados na bag
  - 💰 Dinheiro do jogo

### 3. 🌐 Serviços
- Comunicação com a [PokéAPI](https://pokeapi.co/) para obter dados em tempo real
- Serviços organizados para facilitar manutenção e escalabilidade

---

## 🛠️ Tecnologias Utilizadas
- ⚛️ **React (JavaScript)** para a interface e consumo da API.
- 🖼️ **HTML** para layout.
- 🎨 **CSS** para estilo.
- 📦 **Node.js/npm** para gerenciamento de pacotes do frontend.
- 🌐 **API Externa**: [PokéAPI](https://pokeapi.co/)  

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
│       ├── Image/               # Recursos de imagens
│       │   └── logo.png         # Logo do projeto
│       │
│       ├── components/          # Componentes reutilizáveis
│       │   ├── External_API/    # Componentes que consomem API externa (PokéAPI)
│       │   │   ├── Berry_PokeAPI.js
│       │   │   ├── PokemonDetail.js
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
│           ├── PokemonDetail/
│           │   ├── PokemonDetail.js
│           │   └── PokemonDetail.css
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

### Pré-requisitos
- 🟢 Node.js
- 📦 npm
- 🐳 Docker

### Localmente (sem Docker)
Passos
1. Clone o repositório:
    ```bash
    git clone https://github.com/HelenaMayumiTomokane/FrontEnd-Avancado-Pokemon.git

2. Acesse a pasta do projeto:
    ```bash
    cd FrontEnd-Avancado-Pokemon

3. Instale as dependências:
    ```bash
    npm install

4. Execute a aplicação:
    ```bash
    npm start

A aplicação estará disponível em: http://localhost:3000/

5. E para parar a execução pressione: Ctrl + C


### Localmente (Com Docker)
Passos
1. Clone o repositório:
    ```bash
    git clone https://github.com/HelenaMayumiTomokane/FrontEnd-Avancado-Pokemon.git
    cd FrontEnd-Avancado-Pokemon

2. Certifique-se de ter Docker instalado e rodando, caso não tenha, instale o Docker.
    - Windows: 
        https://docs.docker.com/desktop/install/windows-install/

    - Ubuntu: 
        https://docs.docker.com/engine/install/ubuntu/

    - Mac OS: 
        https://docs.docker.com/desktop/install/mac-install/

3. Na raiz do repositório, construa a imagem:
    ```bash
    docker build -t frontend-pokemon .

4. Execute o container:
    ```bash
    docker run -d -p 3000:3000 frontend-pokemon

5. Acesse via browser ou ferramenta de API:
    ```bash
    http://localhost:3000/openapi

---
## 🌐 APIs Externas

A aplicação consome dados da [PokéAPI](https://pokeapi.co/), utilizando os seguintes endpoints, sem necessidade de cadastro ou licença de uso:

### Base URL
https://pokeapi.co/api/v2

### Endpoints Utilizados

#### 1. Berries
- `/berry` → Retorna a lista de todas as berries.

#### 2. Habitats
- `/pokemon-habitat` → Retorna a lista de todos os habitats de Pokémon.
- `/pokemon-habitat/{nome}` → Retorna todos os Pokémons de um habitat específico.

#### 3. Pokemon
- `/pokemon` → Retorna as informações sobre os pokemons.