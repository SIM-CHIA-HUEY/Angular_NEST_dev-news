FROM node:latest as build

WORKDIR /usr/src/app/devfront

RUN apk add --update nodejs npm

COPY ./ /usr/src/app/devfront

RUN npm install

RUN npm run build

FROM nginx:latest

COPY --from=build /usr/src/app/devfront/dist/devfront /usr/share/nginx/html

EXPOSE 4200

CMD ["npm", "start"]