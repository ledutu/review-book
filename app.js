var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//User
var homeUser = require('./src/routes/user/home');
var book = require('./src/routes/user/book');
var writer = require('./src/routes/user/writer');
var user = require('./src/routes/user/user');
var blog = require('./src/routes/user/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/src/public')));

//Route User
app.use('/', homeUser);
app.use('/book', book);
app.use('/writer', writer);
app.use('/user', user);
app.use('/blog', blog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.render('user/error');
  // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
