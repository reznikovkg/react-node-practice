var express = require('express');
var session = require('express-session');
var transporter = require('../../service/mailer');
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

app.get('/activate', function (req, res, next) {
    const username = req.param('username');

    if (!username) {
        res.status(status.NO_CONTENT.CODE).send({message: 'Пользователь не указан'});
        return;
    }

    models.Users.findOne({
        where: {
            username: username
        }
    })
        .then(user => {
            user.update({
                isActivate: !user.isActivate
            }).then(() => {
                res.status(status.OK.CODE).send({message: 'Статус изменен!'});
            });
        })
        .catch(() => {
            res.status(status.NOT_FOUND.CODE).send({message: status.NOT_FOUND.MESSAGE});
        });
});

app.get('/activateAdmin', function (req, res, next) {
    const username = req.param('username');

    if (!username) {
        res.status(status.NO_CONTENT.CODE).send({message: 'Пользователь не указан'});
        return;
    }

    models.Users.findOne({
        where: {
            username: username
        }
    })
    .then(user => {
        user.update({
            isAdmin: !user.isAdmin
        }).then(() => {
            res.status(status.OK.CODE).send({message: 'Права изменены!'});
        });
    })
    .catch(() => {
        res.status(status.NOT_FOUND.CODE).send({message: status.NOT_FOUND.MESSAGE});
    });
});




//MAPS
app.get('/sendMarker', function (req, res, next) {
    const name = req.param('name');
    const lat = req.param('lat');
    const lng = req.param('lng');

    const marker = models.Markers.build({
        name: name,
        lat: lat,
        lng: lng
    });

    marker.save().then(() => {
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });
});

app.get('/sendLocationCircle', function (req, res, next) {
    const name = req.param('name');
    const radius = req.param('radius');
    const lat = req.param('lat');
    const lng = req.param('lng');

    const LocationCircle = models.LocationCircles.build({
        name: name,
        radius: radius,
        lat: lat,
        lng: lng
    });

    LocationCircle.save().then(() => {
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });
});

app.get('/removeLocationCircle', function (req, res, next) {
    const id = req.param('id');
    const idUsers = req.param('idUsers');

    models.LocationCircles.destroy({
        where: {
            id: id
        }
    }).then(() => {
        if (idUsers) {
            idUsers.forEach((item, i, idUsers)=>{
                const user = models.Notifys.build({
                    user: item,
                    head: 'Ваша локация удалена',
                    type: 'warning',
                    text: 'Срочно смените своё местоположение'
                });

                user.save();
            });
        }
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });

});


app.get('/sendLocationRectangle', function (req, res, next) {
    const name = req.param('name');

    const south = req.param('south');
    const north = req.param('north');
    const west = req.param('west');
    const east = req.param('east');


    const LocationRectangle = models.LocationRectangles.build({
        name: name,
        south: south,
        north: north,
        west: west,
        east:east
    });

    LocationRectangle.save().then(() => {
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });
});


app.get('/removeLocationRectangle', function (req, res, next) {
    const id = req.param('id');
    const idUsers = req.param('idUsers');

    models.LocationRectangles.destroy({
        where: {
            id: id
        }
    }).then(() => {
        if (idUsers) {
            idUsers.forEach((item, i, idUsers)=>{
                const user = models.Notifys.build({
                    user: item,
                    head: 'Ваша локация удалена',
                    type: 'warning',
                    text: 'Срочно смените своё местоположение'
                });

                user.save();
            });
        }
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    });

});

module.exports = app;
