var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var i18n = require("i18n");
const session = require('express-session');
var passport = require('passport');
var faker = require('faker');
var methodOverride = require('method-override')

//Admin
var homeAdmin = require('./src/routes/admin/home')

//User
var homeUser = require('./src/routes/user/home');
var book = require('./src/routes/user/book');
var writer = require('./src/routes/user/writer');
var user = require('./src/routes/user/user');
var blog = require('./src/routes/user/blog');
var seed = require('./src/database/seed/seed.route');

var app = express();

require('dotenv').config()

// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/src/public')));

app.use(methodOverride('_method'))

app.use(passport.initialize());
app.use(passport.session());

app.use(i18n.init);

i18n.configure({
    locales: ['en', 'vi'],
    directory: __dirname + '/src/locales',
    cookie: 'lang',
    objectNotation: true
});

// express-session
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    })
);

const { DB_HOST, DB_PORT, DB_NAME, ACCESS_TIMEOUT, MONGODB_URL } = process.env;

// const mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
const mongoUrl = MONGODB_URL;

const db = mongoose.connection;

const connectWithRetry = function () {
    return mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, (err) => {
        if (err) {
            console.error('Failed to connect to mongo on startup - retrying in 5 sec', err)
            setTimeout(connectWithRetry, ACCESS_TIMEOUT)
        }
    })
}
connectWithRetry()

db.on('connected', () => {
    console.log('Connect DB Successful');
})

//Route Admin

app.use('/admin',homeAdmin);


//Route User
app.use('/', homeUser);
app.use('/book', book);
app.use('/writer', writer);
app.use('/user', user);
app.use('/blog', blog);

//Test
app.use('/api/db', seed);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//     res.render('user/error');
//     // next(createError(404));
// });

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    console.log(err);
    // res.status(err.status || 500);
    res.send(err)
    // res.render('user/error');
});

module.exports = app;
