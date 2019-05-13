#!/bin/bash

docker rm react-node-practice_db_1
docker rm react-node-practice_web_1
docker rm react-node-practice_frontend-react_1

docker rmi react-node-practice_frontend-react
docker rmi react-node-practice_web
docker rmi react-node-practice_db
