const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const cors = require('cors');


const indexRouter = require('./routes/index');
const apiAuthRoute = require('./routes/api/auth');
const apiAdminRoute = require('./routes/api/admin');
const apiUserRoute = require('./routes/api/user');
const apiMapsRoute = require('./routes/api/maps');
const apiBusinessRoute = require('./routes/api/business');

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

app.use('/', indexRouter);
app.use('/api/auth', apiAuthRoute);
app.use('/api/admin', apiAdminRoute);
app.use('/api/user', apiUserRoute);
app.use('/api/maps', apiMapsRoute);
app.use('/api/business', apiBusinessRoute);

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
