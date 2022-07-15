FROM node:lts-alpine3.15 as build-stage

WORKDIR /usr/src/app/

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.23.0-alpine

COPY --from=build-stage /usr/src/app/dist/i-translate /var/www/html

COPY default.conf /etc/nginx/conf.d/default.conf