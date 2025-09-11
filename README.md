# FrontEnd Avançado Pokémon

## 🎮 Descrição

Este projeto é uma aplicação web desenvolvida com **Angular**, permitindo aos usuários buscar e visualizar informações detalhadas sobre Pokémons usando a [PokéAPI](https://pokeapi.co/).  
A interface é responsiva, intuitiva e focada na experiência do usuário, exibindo dados como nome, tipo, habilidades e estatísticas dos Pokémons.

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
- Testes unitários dos principais componentes usando Angular/Karma

---

## 🧪 Tecnologias Utilizadas

- **Frontend:** Angular  
- **Estilização:** CSS  
- **Gerenciamento de pacotes:** npm  
- **API Externa:** [PokéAPI](https://pokeapi.co/)  

---

## 📁 Estrutura do Projeto

```
FrontEnd-Avancado-Pokemon/
│
├── pokemon/                        # Módulo Pokémon
│   ├── components/                 # Componentes reutilizáveis
│   │   ├── pokemon-card/           # Exibe informações de um Pokémon
│   │   └── search-bar/             # Barra de pesquisa de Pokémons
│   │
│   ├── services/                   # Serviços para comunicação com a API
│   │   └── pokemon.service.ts
│   │
│   ├── pokemon.module.ts           # Módulo principal do Pokémon
│   └── pokemon-routing.module.ts   # Definições de rotas do módulo
│
├── src/
│   ├── app/
│   │   ├── app.component.ts        # Componente raiz da aplicação
│   │   └── app.module.ts           # Módulo principal da aplicação
│   │
│   ├── assets/                     # Imagens e recursos estáticos
│   │   └── logo.png
│   │
│   └── environments/               # Configurações de ambiente
│       ├── environment.ts          # Ambiente de desenvolvimento
│       └── environment.prod.ts     # Ambiente de produção
│
├── package.json                    # Dependências e scripts do projeto
├── package-lock.json               # Bloqueio de versões das dependências
└── README.md                       # Este arquivo
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

A aplicação estará disponível em: http://localhost:4200

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
