FROM node:18.10-alpine3.15

WORKDIR /usr/src/app

COPY package.json yarn.lock .env tsconfig.json .sequelizerc nodemon.json .eslintrc.js .prettierrc.json ./
COPY src ./src

RUN yarn install
RUN yarn build

CMD [ "yarn", "start" ]