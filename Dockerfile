FROM node:alpine3.13
WORKDIR /app
COPY . /app

RUN npm install

CMD [ "npm", "run", "dev" ]
