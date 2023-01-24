FROM node:18.10-alpine3.15

WORKDIR /usr/src/app

COPY package.json yarn.lock .env tsconfig.json .sequelizerc nodemon.json .eslintrc.js .prettierrc.json  src/ ./

RUN yarn install


CMD [ "yarn", "dev" ]