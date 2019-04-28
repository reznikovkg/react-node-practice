const express = require('express');
const app = express();

const models = require('../../models');

const status = require('../../config/const')['status'];

app.use(function (req, res, next) {
    const token = req.param('token');
    models.Users.findOne({
        where: {
            token: token
        }
    })
        .then(user => {
            if (user.isAdmin) {
                next();
            } else {
                res.status(status.FORBIDDEN.CODE)
                    .send({message: status.FORBIDDEN.MESSAGE});
            }
        })
        .catch(() => {
            res.status(status.INTERVAL_SERVER_ERROR.CODE).send({
                message: status.INTERVAL_SERVER_ERROR.MESSAGE
            });
        });
});


app.get('/getUsers', function (req, res, next) {
    models.Users.findAll()
        .then(users => {
            res.status(status.OK.CODE).send({users: users});
        })
        .catch(() => {
            res.status(status.NOT_FOUND.CODE)
                .send({message: status.NOT_FOUND.MESSAGE});
        });
});

app.get('/editUser', function (req, res, next) {
    const id = req.param('id');
    const username = req.param('username');
    const birthday = req.param('birthday');

    models.Users.update({
        username: username,
        birthday: birthday
    }, {
        where: {
            id: id
        }
    }).then(() => {
        res.status(status.OK.CODE).send({message: 'Обновлено'});
    }).catch(() => {
        res.status(status.NOT_FOUND.CODE).send({message: status.NOT_FOUND.MESSAGE});
    });
});

app.get('/getUser', function (req, res, next) {
    const id = req.param('id');

    models.Users.findOne({
        where: {
            id: id
        }
    })
        .then(user => {
            res.status(status.OK.CODE).send({user: user});
        })
        .catch(() => {
            res.status(status.NOT_FOUND.CODE).send({message: status.NOT_FOUND.MESSAGE});
        });
});




module.exports = app;
