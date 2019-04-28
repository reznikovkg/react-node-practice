const express = require('express');
const app = express();
const temlateMail = require('../../service/templateMail');

const models = require('../../models');

const status = require('../../config/const')['status'];
const domainClient = require('../../config/const')['domainClient'];
const domainServer = require('../../config/const')['domainServer'];

app.get('/login', function (req, res, next) {
    const username = req.param('username');
    const password = req.param('password');

    if (!((username.length > 0) &&
        (/^[a-zA-Z0-9]+$/.test(username)) &&
        (password.length > 0) &&
        (/^[a-zA-Z0-9*#!+]+$/.test(password))))
    {
        res.status(status.INTERVAL_SERVER_ERROR.CODE).send({error: 'Ошибка валидации'});
        return;
    }

    models.Users.findOne({
        where: {
            username: username
        }
    })
        .then(user => {
            if (!user) {
                res.status(status.NOT_FOUND.CODE).send({error: `Пользователь с именем ${username} не найден`});
                return;
            }

            if (user.password !== password) {
                res.status(status.NOT_FOUND.CODE).send({error: 'Неверный пароль'});
                return;
            }

            var token = '';
            var words = '-0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
            var max_position = words.length - 1;
            for (i = 0; i < 120; ++i) {
                position = Math.floor(Math.random() * max_position);
                token = token + words.substring(position, position + 1);
            }

            user.update({
                token: token,
            }).then((user) => {
                res.status(status.OK.CODE).send({token: user.token});
            })

        }).catch((error) => {
            res.status(status.INTERVAL_SERVER_ERROR.CODE).send({error: 'Ошибка'});
        });
});

app.get('/register', function (req, res, next) {
    const username = req.param('username');
    const email = req.param('email');
    const password = req.param('password');

    const business = req.param('business');

    let type;
    if (business) {
        type = 'business';
    } else {
        type = 'default';
    }

    const name = req.param('name');
    const phone = req.param('phone');
    const birthday = req.param('birthday');
    const gender = req.param('gender');
    const address = req.param('address');
    const about = req.param('about');



    if (!((username.length > 0) &&
        (/^[a-zA-Z0-9]+$/.test(username)) &&
        (password.length > 0) &&
        (/^[a-zA-Z0-9*#!+]+$/.test(password)) &&
        (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(email))))
    {
        res.status(status.INTERVAL_SERVER_ERROR.CODE).send({error: 'Ошибка валидации'});
        return;
    }

    var token = '';
    const words = '-0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const max_position = words.length - 1;
    for (i = 0; i < 120; ++i) {
        position = Math.floor(Math.random() * max_position);
        token = token + words.substring(position, position + 1);
    }

    const user = models.Users.build({
        username,
        email,
        password,
        token,
        type,
        name,
        phone,
        birthday,
        gender,
        address,
        about
    });

    user.save().then(() => {

        temlateMail('/../templates/mail/register.html', {
            username: username,
            email: email,
            url: `${domainServer}/api/auth/activate?token=${token}`
        });

        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });
});

app.get('/connect', function (req, res, next) {
    const token = req.param('token');

    models.Users.findOne({
        where: {
            token: token
        }
    })
        .then(user => {
            if (!user) {
                res.status(status.INTERVAL_SERVER_ERROR.CODE).send({error: 'Недействительный токен'});
                return;
            }

            res.send({
                'id': user.id,
                'isActivate': user.isActivate,
                'type': user.type,
                'username': user.username,
                'birthday': user.birthday,
                'gender': user.gender,
                'phone': user.phone,
                'address': user.address,
                'photo': user.address

            });
        });
});


app.get('/activate', function (req, res, next) {
    const token = req.param('token');

    models.Users.findOne({
        where: {
            token: token
        }
    })
        .then(user => {
            user.update({
                isActivate: true,
            }).then((user) => {
                res.redirect(`${domainClient}/active`);
            })

        }).catch((error) => {
        res.status(status.INTERVAL_SERVER_ERROR.CODE).send({error: 'Ошибка'});
    });
});

module.exports = app;
