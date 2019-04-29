#!/bin/bash

docker exec -it practice_web_1 npx makemigration --name
docker exec -it practice_web_1 npx runmigration
docker exec -it practice_web_1 node_modules/.bin/sequelize db:seed:all

cd frontend-react

npm start
