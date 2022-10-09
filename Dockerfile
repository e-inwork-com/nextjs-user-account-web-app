FROM node:17

WORKDIR /usr/src/web

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]
