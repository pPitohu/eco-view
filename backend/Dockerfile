FROM node:16-alpine

WORKDIR /app/backend

RUN npm install -g ts-node-dev

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000