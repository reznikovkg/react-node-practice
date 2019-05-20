const express = require('express');
const app = express();

const models = require('../../models');

const status = require('../../config/const')['status'];

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/place')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg' )
    }
});

const upload = multer({ storage: storage });


app.use(upload.single('file'), function (req, res, next) {
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

app.post('/createPlaces', (req, res, next) => {
    const userId = req.param('userId');

    const name = req.param('name');
    const description = req.param('description');
    const address = req.param('address');
    const contactEmail = req.param('contactEmail');
    const contactPhone = req.param('contactPhone');
    const workingTimeStart = req.param('workingTimeStart');
    const workingTimeFinish = req.param('workingTimeFinish');
    const picture =  req.file.path;

    console.log(workingTimeFinish);

    const place = models.Places.build({
        userId,
        name,
        description,
        address,
        contactEmail,
        contactPhone,
        workingTimeStart,
        workingTimeFinish,
        picture
    });

    place.save().then((place) => {
        res.status(status.OK.CODE).send({'message': 'Упешно'});
    }).catch(()=>{
        res.status(status.INTERVAL_SERVER_ERROR.CODE).send({'message': status.INTERVAL_SERVER_ERROR.MESSAGE});
    });
});


app.get('/removePlaces', function (req, res, next) {
    const userId = req.param('userId');
    const id = req.param('id');


    models.Places.destroy({
        where: {
            userId: userId,
            id: id
        }
    }).then(() => {
        res.status(status.OK.CODE).send({message: status.OK.MESSAGE});
    }).catch((error) => {
        res.status(status.INTERVAL_SERVER_ERROR.CODE).send({error: status.INTERVAL_SERVER_ERROR.MESSAGE});
    });

});


module.exports = app;
