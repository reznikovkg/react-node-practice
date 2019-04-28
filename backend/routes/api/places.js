const express = require('express');
const app = express();

const models = require('../../models');

const status = require('../../config/const')['status'];
const userTypes = require('../../config/const')['userTypes'];

app.use(function (req, res, next) {
    const token = req.param('token');
    models.Users.findOne({
        where: {
            token: token
        }
    })
        .then(user => {
            if (user.isActivate) {
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

app.get('/getPlaces', function (req, res, next) {
    const userId = req.param('userId');
    const token = req.param('token');

    const sortColumn = req.param('sortColumn');
    const sortDirection = req.param('sortDirection');
    const sortPage = Number(req.param('sortPage'));
    const sortLimit = Number(req.param('sortLimit'));

    models.Users.findOne({
        where: {
            token: token
        }
    }).then( user => {
        switch (user.type) {
            case userTypes.BUSINESS:
                models.Places.findAll({
                    where: {
                        userId: userId
                    },
                    limit: (sortLimit ? sortLimit : null),
                    offset: (sortPage ? (sortPage-1)*sortLimit : null),
                    order: [
                        [sortColumn, (sortDirection === 'descending' ? 'DESC' : 'ASC' )]
                    ]
                })
                    .then(places => {
                        res.status(status.OK.CODE).send({'places': places, t: 10});
                    })
                    .catch((error) => {
                        console.log(error)
                        res.status(status.NOT_FOUND.CODE).send({'message': 'Не найдено'});
                    });
                break;
            default:
                res.status(status.FORBIDDEN.CODE).send({'message': status.FORBIDDEN.MESSAGE});
        }
    });


});

app.get('/getPlace', function (req, res, next) {
    const id = req.param('id');

    models.Places.findOne({
        where: {
            id: id
        },
        include: [{ all: true, include: [{ all: true }] }]
    })
        .then(place => {
            res.status(status.OK.CODE).send({'place': place});
        })
        .catch(() => {
            res.status(status.NOT_FOUND.CODE).send({'message': 'Не найдено'});
        });
});

module.exports = app;
