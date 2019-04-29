'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 * createTable "Places", deps: [Users]
 * createTable "Reviews", deps: [Places, Users]
 *
 **/

var info = {
    "revision": 1,
    "name": "noname",
    "created": "2019-04-29T18:04:08.900Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "Users",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "username": {
                    "type": Sequelize.STRING,
                    "field": "username",
                    "unique": true
                },
                "email": {
                    "type": Sequelize.STRING,
                    "field": "email",
                    "unique": true
                },
                "password": {
                    "type": Sequelize.STRING,
                    "field": "password"
                },
                "token": {
                    "type": Sequelize.STRING,
                    "field": "token",
                    "unique": true
                },
                "isActivate": {
                    "type": Sequelize.BOOLEAN,
                    "field": "isActivate"
                },
                "type": {
                    "type": Sequelize.STRING,
                    "field": "type"
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "birthday": {
                    "type": Sequelize.DATEONLY,
                    "field": "birthday"
                },
                "gender": {
                    "type": Sequelize.STRING,
                    "field": "gender"
                },
                "phone": {
                    "type": Sequelize.STRING,
                    "field": "phone"
                },
                "about": {
                    "type": Sequelize.STRING,
                    "field": "about"
                },
                "address": {
                    "type": Sequelize.STRING,
                    "field": "address"
                },
                "photo": {
                    "type": Sequelize.STRING,
                    "field": "photo"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                }
            },
            {
                "charset": "utf8"
            }
        ]
    },
    {
        fn: "createTable",
        params: [
            "Places",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "name": {
                    "type": Sequelize.STRING,
                    "field": "name"
                },
                "description": {
                    "type": Sequelize.STRING,
                    "field": "description"
                },
                "address": {
                    "type": Sequelize.STRING,
                    "field": "address"
                },
                "contactEmail": {
                    "type": Sequelize.STRING,
                    "field": "contactEmail"
                },
                "contactPhone": {
                    "type": Sequelize.STRING,
                    "field": "contactPhone"
                },
                "workingTimeStart": {
                    "type": Sequelize.STRING,
                    "field": "workingTimeStart"
                },
                "workingTimeFinish": {
                    "type": Sequelize.STRING,
                    "field": "workingTimeFinish"
                },
                "picture": {
                    "type": Sequelize.STRING,
                    "field": "picture"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "field": "userId",
                    "onUpdate": "CASCADE",
                    "onDelete": "SET NULL",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {
                "charset": "utf8"
            }
        ]
    },
    {
        fn: "createTable",
        params: [
            "Reviews",
            {
                "id": {
                    "type": Sequelize.INTEGER,
                    "field": "id",
                    "autoIncrement": true,
                    "primaryKey": true,
                    "allowNull": false
                },
                "rating": {
                    "type": Sequelize.INTEGER,
                    "field": "rating"
                },
                "comment": {
                    "type": Sequelize.STRING,
                    "field": "comment"
                },
                "createdAt": {
                    "type": Sequelize.DATE,
                    "field": "createdAt",
                    "allowNull": false
                },
                "updatedAt": {
                    "type": Sequelize.DATE,
                    "field": "updatedAt",
                    "allowNull": false
                },
                "placeId": {
                    "type": Sequelize.INTEGER,
                    "field": "placeId",
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Places",
                        "key": "id"
                    },
                    "allowNull": true
                },
                "userId": {
                    "type": Sequelize.INTEGER,
                    "field": "userId",
                    "onUpdate": "CASCADE",
                    "onDelete": "cascade",
                    "references": {
                        "model": "Users",
                        "key": "id"
                    },
                    "allowNull": true
                }
            },
            {
                "charset": "utf8"
            }
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
