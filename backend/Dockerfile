
FROM node:18-alpine

# Setting the working directory in the container
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD [ "node", "server.js" ]