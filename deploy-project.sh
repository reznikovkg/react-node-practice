#!/bin/bash

docker exec -it practice_web_1 node_modules/.bin/sequelize index:migrate
docker exec -it practice_web_1 node_modules/.bin/sequelize index:seed:all

cd frontend-react

npm start
