var express = require('express');
var session = require('express-session');
var app = express();

var models = require('../../models');
const status = require('../../config/const')['status'];

app.get('/edit', function (req, res, next) {
    const token = req.param('token');
    const username = req.param('username');
    const birthday = req.param('birthday');

    models.Users.findOne({
        where: {
            token: token
        }
    })
        .then(user => {
            user.update({
                username: username,
                birthday: birthday
            }).then(() => {
                res.status(status.OK.CODE).send({message: 'Обновлено'});
            })
            .catch(() => {
                res.status(status.NOT_FOUND.CODE).send({message: status.NOT_FOUND.MESSAGE});
            });
        })
        .catch(() => {
            res.status(status.FORBIDDEN.CODE).send({message: status.FORBIDDEN.MESSAGE});
        });
});


app.get('/newPass', function (req, res, next) {
    const token = req.param('token');
    const password = req.param('password');

    models.Users.findOne({
        where: {
            token: token
        }
    })
        .then(user => {
            user.update({
                password: password
            }).then(() => {
                res.status(status.OK.CODE).send({message: 'Обновлено'});
            }).catch(() => {
                res.status(status.NOT_FOUND.CODE).send({message: status.NOT_FOUND.MESSAGE});
            });
        })
        .catch(() => {
            res.status(status.FORBIDDEN.CODE).send({message: status.FORBIDDEN.MESSAGE});
        });
});


//Notifys
app.get('/getNotifys', function (req, res, next) {
    const user = req.param('user');

    models.Notifys.findAll({
        where: {
            user: user
        }
    })
        .then(notifys => {
            res.status(status.OK.CODE).send({notifys: notifys});
        })
        .catch(() => {
            res.status(status.NOT_FOUND.CODE).send({message: status.NOT_FOUND.MESSAGE});
        });
});

app.get('/getAllNumber', function (req, res, next) {
    const user = req.param('user');

    models.Notifys.findAll({
        where: {
            user: user
        }
    })
        .then(notifys => {
            res.status(status.OK.CODE).send({notifyNumber: notifys.length});
        })
        .catch(() => {
            res.status(status.NOT_FOUND.CODE).send({message: status.NOT_FOUND.MESSAGE});
        });
});

app.get('/removeNotify', function (req, res, next) {
    const id = req.param('id');

    models.Notifys.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    })
    .catch(() => {
        res.status(status.NOT_FOUND.CODE).send({message: status.NOT_FOUND.MESSAGE});
    });
});

module.exports = app;



