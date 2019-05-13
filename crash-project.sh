#!/bin/bash

docker rm react-node-practice_db_1
docker rm react-node-practice_web_1
docker rm react-node-practice_front_1

docker rmi react-node-practice_front
docker rmi react-node-practice_web
docker rmi react-node-practice_db
