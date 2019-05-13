FROM node:latest

WORKDIR /var/www/frontend

COPY . ./

RUN apt-get -y update
RUN npm install

EXPOSE 3000
