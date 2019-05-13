#!/bin/bash

npx makemigration --name
npx runmigration
node_modules/.bin/sequelize db:seed:all

npm start
