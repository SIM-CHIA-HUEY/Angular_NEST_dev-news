FROM node:16.13.1 As development

WORKDIR /usr/src/app/devback

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:16.13.1 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app/devback

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/devback/dist ./dist

CMD ["node", "dist/main"]