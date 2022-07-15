FROM node:lts-alpine3.15

WORKDIR /usr/src/app/

RUN npm install -g @angular/cli

COPY package*.json .

RUN npm install --include=dev

COPY . .

EXPOSE 4200

CMD [ "npm","start" ]