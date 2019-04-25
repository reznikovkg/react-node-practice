'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "Users", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "users",
    "created": "2019-04-24T23:52:10.316Z",
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
                "field": "email"
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
        {}
    ]
}];

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
