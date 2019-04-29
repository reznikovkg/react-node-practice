const express = require('express');
const app = express();

const { Sequelize } = require('../../models/index');
const Op = Sequelize.Op;

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
            if (user.type === 'admin') {
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

app.get('/removePlaces', function (req, res, next) {
    const id = req.param('id');

    models.Places.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });

});

app.get('/removeReview', function (req, res, next) {
    const id = req.param('reviewId');

    models.Reviews.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });

});




















app.get('/getUsers', function (req, res, next) {

    const sortColumn = req.param('sortColumn');
    const sortDirection = req.param('sortDirection');
    const sortPage = Number(req.param('sortPage'));
    const sortLimit = Number(req.param('sortLimit'));
    const sortSearch = req.param('sortSearch');

    let where = {
        type: {
            [Op.or]: ['business', 'default']
        }
    };

    if (sortSearch) {
        where.username =  { [Op.like]: `%${sortSearch}%` };
    }

    models.Users.findAll({
        where: where,
        limit: (sortLimit ? sortLimit : null),
        offset: (sortPage ? (sortPage-1)*sortLimit : null),
        order: [
            [sortColumn, (sortDirection === 'descending' ? 'DESC' : 'ASC' )]
        ]
    })
        .then(users => {
            let countPlacesOut = 0;

            models.Users.findAndCount({
                where: where
            })
                .then(countPlaces => {
                    countPlacesOut = Math.ceil(Number(countPlaces.count)/sortLimit);
                    res.status(status.OK.CODE).send({'users': users, sortPageMax: countPlacesOut});
                });
        })
        .catch(() => {
            res.status(status.NOT_FOUND.CODE)
                .send({message: status.NOT_FOUND.MESSAGE});
        });
});



app.get('/removeUser', function (req, res, next) {
    const id = req.param('id');


    models.Users.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });

});




module.exports = app;
