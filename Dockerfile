FROM node:20-alpine

# Diretório de trabalho
WORKDIR /Diagnosoft_Frontend

# Copia apenas os arquivos de dependência primeiro
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos (src, vite.config etc.)
COPY . .

# Expõe a porta do Vite
EXPOSE 5173

# Comando para iniciar o servidor de desenvolvimento
CMD ["npm", "run", "dev"]
