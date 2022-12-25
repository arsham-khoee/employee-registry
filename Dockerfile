FROM node:18.12.1

RUN mkdir -p /usr/src/employee-registry/node_modules

WORKDIR /usr/src/employee-registry

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]