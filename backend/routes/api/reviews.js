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

module.exports = app;
