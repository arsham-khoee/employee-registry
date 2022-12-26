FROM node:18.9.1

RUN mkdir -p /usr/src/employee-registry/node_modules

WORKDIR /usr/src/employee-registry

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000

RUN npx prisma db pull

RUN npx prisma generate

RUN npx prisma db push

CMD [ "yarn", "start" ]