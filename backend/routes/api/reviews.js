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
    }).catch((error) => {
        res.status(status.INTERVAL_SERVER_ERROR.CODE).send({error: status.INTERVAL_SERVER_ERROR.MESSAGE});
    });

});



app.get('/getReviews', function (req, res, next) {
    const userId = req.param('userId');
    const placeId = req.param('placeId');

    const dateStart = req.param('dateStart');
    const dateStartNode = new Date(`${ dateStart.slice(3,5) }-${ dateStart.slice(0,2) }-${ dateStart.slice(6) }`);

    const dateFinish = req.param('dateFinish');
    const dateFinishNode = new Date(`${ dateFinish.slice(3,5) }-${ dateFinish.slice(0,2) }-${ dateFinish.slice(6) }`);
    dateFinishNode.setDate(dateFinishNode.getDate()+1);
    dateFinishNode.setMinutes(dateFinishNode.getMinutes()-5);

    const dateNow = new Date().getTime();

    const dateDayAgo = dateNow - 86400000;
    const dateWeekAgo = dateNow - 86400000 * 7;
    const dateMonthAgo = dateNow - 86400000 * 30;
    const dateYearAgo = dateNow - 86400000 * 365;

    models.Reviews.findAll({
        where: {
            placeId: placeId,
            updatedAt: {
                [Op.gte]: dateStartNode,
                [Op.lte]: dateFinishNode
            }
        },
        order: [
            ['updatedAt', 'ASC']
        ]
    }).then((reviews) => {

        let sum = {
            day: 0,
            week: 0,
            month: 0,
            year: 0
        };

        let num = {
            day: 0,
            week: 0,
            month: 0,
            year: 0
        };

        let reviewsOut = [];
        const options = { year: 'numeric', month: 'long', day: 'numeric' };

        reviews.forEach((item) => {
            const dateItemText = item.updatedAt.toLocaleString('ru', options);

            if (reviewsOut[dateItemText]) {
                reviewsOut[dateItemText].sum += item.rating;
                reviewsOut[dateItemText].num++;
            } else {
                reviewsOut[dateItemText] = {
                    sum: item.rating,
                    num: 1,
                    date: dateItemText,
                };
            }

            reviewsOut[dateItemText].avgRating = (reviewsOut[dateItemText].sum/reviewsOut[dateItemText].num).toFixed(2);


            let dateItem = new Date().setDate(new Date(item.updatedAt).getDate());

            if (dateItem >= dateYearAgo) {
                sum.year += item.rating;
                num.year++;

                if (dateItem >= dateMonthAgo) {
                    sum.month += item.rating;
                    num.month++;

                    if (dateItem >= dateWeekAgo) {
                        sum.week += item.rating;
                        num.week++;

                        if (dateItem >= dateDayAgo) {
                            sum.day += item.rating;
                            num.day++;
                        }
                    }
                }
            }
        });

        let means = {
            day: num.day ? (sum.day/num.day).toFixed(2) : '-',
            week: num.week ? (sum.week/num.week).toFixed(2) : '-',
            month: num.month ? (sum.month/num.month).toFixed(2) : '-',
            year: num.year ? (sum.year/num.year).toFixed(2) : '-',
        };

        let reviewsToChart = {
            date: Object.keys(reviewsOut),
            rating: []
        };

        reviewsToChart.date.map((rev) => {
            reviewsToChart.rating.push(reviewsOut[rev].avgRating);
        });

        res.status(status.OK.CODE).send({ reviewsToChart, means});
    }).catch((error) => {
        res.status(status.INTERVAL_SERVER_ERROR.CODE).send({error: status.INTERVAL_SERVER_ERROR.MESSAGE});
    });
});

module.exports = app;
