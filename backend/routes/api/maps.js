var express = require('express');
var session = require('express-session');
var app = express();

var models = require('../../models');

const status = require('../../config/const')['status'];

app.get('/allMarkers', function (req, res, next) {

    models.Markers.findAll()
        .then(markers => {
            res.status(status.OK.CODE).send({'markers': markers});
        })
        .catch(() => {
            res.status(status.NOT_FOUND.CODE).send({'message': 'Нет прав'});
        });
});

app.get('/allLocationCircle', function (req, res, next) {

    models.LocationCircles.findAll()
        .then(LocationCircle => {
            res.status(status.OK.CODE).send({'locationCircle': LocationCircle});
        })
        .catch((error) => {
            res.status(status.NOT_FOUND.CODE).send({'message': error});
        });
});

app.get('/allLocationRectangle', function (req, res, next) {

    models.LocationRectangles.findAll()
        .then(LocationRectangle => {
            res.status(status.OK.CODE).send({'locationRectangle': LocationRectangle});
        })
        .catch((error) => {
            res.status(status.NOT_FOUND.CODE).send({'message': error});
        });
});

app.get('/setLocationPoint', function (req, res, next) {
    const token = req.param('token');
    const user = req.param('id');

    const lat = req.param('lat');
    const lng = req.param('lng');


    models.LocationUsers.findOne({
        where: {
            user: user
        }
    })
        .then(LocationUser => {
            if (LocationUser) {
                LocationUser.update({
                    lat: lat,
                    lng: lng
                }).then(LocationUser => {
                    res.status(status.OK.CODE).send({'message': status.OK.MESSAGE});
                }).catch((error) => {
                    res.status(status.NOT_FOUND.CODE).send({'message': status.NOT_FOUND.MESSAGE});
                })
            } else {
                const LocationUser = models.LocationUsers.build({
                    user: user,
                    lat: lat,
                    lng: lng
                });

                LocationUser.save().then(() => {
                    res.status(status.OK.CODE).send({'message': 'Успех'});
                });
            }

        })
        .catch((error) => {
            res.status(status.NOT_FOUND.CODE).send({'message': status.NOT_FOUND.MESSAGE});
        });
});

app.get('/getLocationUser', function (req, res, next) {
    const user = req.param('id');

    models.LocationUsers.findOne({
        where: {
            user: user
        }
    })
        .then(LocationUser => {
            res.status(status.OK.CODE).send({'locationUser': LocationUser});
        })
        .catch((error) => {
            res.status(status.NOT_FOUND.CODE).send({'message': status.NOT_FOUND.MESSAGE});
        });
});

app.get('/allLocationUsers', function (req, res, next) {

    models.LocationUsers.findAll()
        .then(LocationUser => {
            res.status(status.OK.CODE).send({'locationUsers': LocationUser});
        })
        .catch((error) => {
            res.status(status.NOT_FOUND.CODE).send({'message': status.NOT_FOUND.MESSAGE});
        });
});


module.exports = app;
