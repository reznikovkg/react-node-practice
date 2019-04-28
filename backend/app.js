const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');

//require ROUTES
const indexRouter = require('./routes/index');

const apiAuthRoute = require('./routes/api/auth')

const apiAdminRoute = require('./routes/api/admin');
const apiBusinessRoute = require('./routes/api/business');
const apiDefaultRoute = require('./routes/api/default');

const apiPlacesRoute = require('./routes/api/places');
const apiReviewsRoute = require('./routes/api/reviews');


let app = express();

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//user ROUTES
app.use('/', indexRouter);
app.use('/api/auth', apiAuthRoute);
app.use('/api/admin', apiAdminRoute);
app.use('/api/business', apiBusinessRoute);
app.use('/api/default', apiDefaultRoute);
app.use('/api/places', apiPlacesRoute);
app.use('/api/reviews', apiReviewsRoute);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
