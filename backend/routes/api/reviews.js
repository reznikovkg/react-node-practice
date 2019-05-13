const express = require('express');
const app = express();

const models = require('../../models');

const { Sequelize } = require('../../models/index');
const Op = Sequelize.Op;

const status = require('../../config/const')['status'];

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


app.get('/removeReview', function (req, res, next) {
    const userId = req.param('userId');
    const placeId = req.param('placeId');

    models.Reviews.destroy({
        where: {
            userId: userId,
            placeId: placeId
        }
    }).then(() => {
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });

});



app.get('/getReviews', function (req, res, next) {
    const userId = req.param('userId');
    const placeId = req.param('placeId');

    const dateStart = req.param('dateStart');
    const dateStartNode = new Date(`${ dateStart.slice(3,5) }-${ dateStart.slice(0,2) }-${ dateStart.slice(6) }`);

    const dateFinish = req.param('dateFinish');
    const dateFinishNode = new Date(`${ dateFinish.slice(3,5) }-${ dateFinish.slice(0,2) }-${ dateFinish.slice(6) }`);

    let means = {};
    let statusReviews = false;
    let reviewsOut = [];
    //day

    const dateNow = new Date();
    const dateDayAgo = new Date().setDate(dateNow.getDate() - 1);

    models.Reviews.findAll({
        where: {
            placeId: placeId,
            updatedAt: {
                [Op.gt]: dateDayAgo
            }
        },
    }).then((reviews) => {
        if (!reviews.length) {
            means.day = 0;
        }

        let sum = 0;
        reviews.forEach((item) => {
            sum += item.rating;
        });

        means.day = sum/reviews.length;
        reviewsOut = reviews;
        statusReviews = true;
    });

    res.status(status.OK.CODE).send({ reviewsOut, means});

});

module.exports = app;
