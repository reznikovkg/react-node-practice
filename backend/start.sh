#!/bin/bash

docker exec -it react-node-practice_web_1 npx makemigration --name
docker exec -it react-node-practice_web_1 npx runmigration
docker exec -it react-node-practice_web_1 node_modules/.bin/sequelize db:seed:all

npm start