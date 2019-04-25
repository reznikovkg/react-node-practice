#!/bin/bash

docker rm maps-node-vue_db_1

docker rm maps-node-vue_web_1

docker rmi maps-node-vue_web
