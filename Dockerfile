FROM node:12-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

CMD yarn start
