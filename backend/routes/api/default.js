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
            if (user.type === 'default') {
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

app.get('/saveReview', function (req, res, next) {
    const userId = req.param('userId');
    const placeId = req.param('placeId');

    const comment = req.param('comment');
    const rating = req.param('rating');

    models.Reviews.findOne({
        where: {
            userId: userId,
            placeId: placeId
        }
    })
        .then(review => {
            review.update({
                comment: comment,
                rating: rating
            }).then((review) => {
                res.status(status.OK.CODE).send({'message': 'Обновлено'});
            });

            res.status(status.OK.CODE).send({'place': place});
        })
        .catch(() => {

            const review = models.Reviews.build({
                userId: userId,
                placeId: placeId,
                comment,
                rating
            });

            review.save().then(() => {
                res.status(status.OK.CODE).send({'message': 'Создано'});
            }).catch(() => {
                res.status(status.INTERVAL_SERVER_ERROR.CODE)
                    .send({message: status.INTERVAL_SERVER_ERROR.MESSAGE});
            });
        });
});


module.exports = app;
