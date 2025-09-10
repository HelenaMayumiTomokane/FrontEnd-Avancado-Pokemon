FROM node:18

WORKDIR /app

# Copia apenas o package.json e package-lock.json de dentro da pasta pokemon
COPY pokemon/package*.json ./

RUN npm install

# Copia todo o código do frontend
COPY pokemon/ .

EXPOSE 3000

CMD ["npm", "start"]
