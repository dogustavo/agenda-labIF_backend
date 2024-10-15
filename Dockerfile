FROM node:20-slim AS build

# Instalar bash (opcional, dependendo das suas necessidades)
RUN apt-get update && apt-get install -y bash


WORKDIR /usr/src/app
# Copiar package.json e package-lock.json (se disponível)
COPY package*.json ./

RUN chown -R node:node /usr/src/app

USER node

# Instalar as dependências
RUN npm ci

# Copiar o restante dos arquivos
COPY . ./

COPY --chown=node:node . .

# Construir o aplicativo
RUN npm run build

# Expor a porta que o app irá rodar
EXPOSE 8000

# Comando para rodar o aplicativo
CMD [ "npm", "run", "serve" ]
