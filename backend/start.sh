#!/bin/bash


sleep 25
npx runmigration
node_modules/.bin/sequelize db:seed:all

echo "MIGRATION DONE & SEED DONE"
echo "MIGRATION DONE & SEED DONE"
echo "MIGRATION DONE & SEED DONE"
echo "MIGRATION DONE & SEED DONE"
echo "MIGRATION DONE & SEED DONE"

npm start
