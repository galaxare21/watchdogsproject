FROM node:20.18.0-bullseye

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app/

EXPOSE 3306

CMD [ "node", "index" ]
