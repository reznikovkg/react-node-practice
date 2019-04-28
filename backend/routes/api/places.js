var express = require('express');
var session = require('express-session');
var app = express();

var models = require('../../models');

const status = require('../../config/const')['status'];

app.get('/getPlace', function (req, res, next) {
    const id = req.param('id');

    models.Places.findOne({
        where: {
            id: id
        },
        include: [{ all: true }]
    })
        .then(place => {
            res.status(status.OK.CODE).send({'place': place});
        })
        .catch(() => {
            res.status(status.NOT_FOUND.CODE).send({'message': 'Не найдено'});
        });
});

module.exports = app;
