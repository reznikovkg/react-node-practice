var express = require('express');
var session = require('express-session');
var app = express();

var models = require('../../models');

const status = require('../../config/const')['status'];

app.use(function (req, res, next) {
    const token = req.param('token');
    models.Users.findOne({
        where: {
            token: token
        }
    })
        .then(user => {
            if (user.type === 'business') {
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

app.get('/allPlaces', function (req, res, next) {
    const userId = req.param('userId');

    models.Places.findAll({
        where: {
            user: userId
        }
    })
        .then(places => {
            res.status(status.OK.CODE).send({'places': places});
        })
        .catch(() => {
            res.status(status.NOT_FOUND.CODE).send({'message': 'Не найдено'});
        });
});

app.get('/sendPlaces', function (req, res, next) {
    const user = req.param('userId');

    const name = req.param('name');
    const description = req.param('description');
    const address = req.param('address');
    const contactEmail = req.param('contactEmail');
    const contactPhone = req.param('contactPhone');
    const workingTimeStart = req.param('workingTimeStart');
    const workingTimeFinish = req.param('workingTimeFinish');

    const place = models.Places.build({
        user,
        name,
        description,
        address,
        contactEmail,
        contactPhone,
        workingTimeStart,
        workingTimeFinish
    });

    place.save().then(() => {

        res.status(status.OK.CODE).send({'message': 'Упешно'});
    }).catch(()=>{
        res.status(status.INTERVAL_SERVER_ERROR.CODE).send({'message': 'Ошибка'});
    });
});



module.exports = app;
