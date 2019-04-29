const express = require('express');
const app = express();
const { Sequelize } = require('../../models/index');
const Op = Sequelize.Op;
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
    const sortSearch = req.param('sortSearch');

    let where = {};

    if (sortSearch) {
        where.name =  { [Op.like]: `%${sortSearch}%` };
    }

    models.Users.findOne({
        where: {
            token: token
        }
    }).then( user => {
        let countPlacesOut = 0;

        switch (user.type) {
            case userTypes.BUSINESS:
                where.userId = userId;

                models.Places.findAndCount({
                    where: where
                }).then(countPlaces => {
                    countPlacesOut = Math.ceil(Number(countPlaces.count)/sortLimit);
                });

                models.Places.findAll({
                    where: where,
                    limit: (sortLimit ? sortLimit : null),
                    offset: (sortPage ? (sortPage-1)*sortLimit : null),
                    order: [
                        [sortColumn, (sortDirection === 'descending' ? 'DESC' : 'ASC' )]
                    ]
                })
                    .then(places => {
                        res.status(status.OK.CODE).send({'places': places, sortPageMax: countPlacesOut});
                    })
                    .catch((error) => {
                        console.log(error)
                        res.status(status.NOT_FOUND.CODE).send({'message': 'Не найдено'});
                    });
                break;
            case userTypes.DEFAULT:
                models.Places.findAndCount({
                    where: where
                })
                    .then(countPlaces => {
                        countPlacesOut = Math.ceil(Number(countPlaces.count)/sortLimit);
                    });

                models.Places.findAll({
                    where: where,
                    limit: (sortLimit ? sortLimit : null),
                    offset: (sortPage ? (sortPage-1)*sortLimit : null),
                    order: [
                        [sortColumn, (sortDirection === 'descending' ? 'DESC' : 'ASC' )]
                    ]
                })
                    .then(places => {
                        res.status(status.OK.CODE).send({'places': places, sortPageMax: countPlacesOut});
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
