var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
const Dishes = require("./models/dishes");
<<<<<<< Updated upstream

=======
var passport = require('passport');
var authenticate = require('./authenticate');
var config = require('./config');
>>>>>>> Stashed changes


const url = config.mongoUrl;
const connect = mongoose.connect(url);
connect.then(
  (db) => {
    console.log("Connected correctly to server");
  },
  (err) => {
    console.log(err);
  }
);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var dishRouter = require('./routes/dishRouter');
var promoRouter = require('./routes/promoRouter');
var leaderRouter = require('./routes/leaderRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-09876-54321'));


<<<<<<< Updated upstream
app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 172800000 },
  store: new FileStore()
}));
=======
app.use(passport.initialize());
>>>>>>> Stashed changes

app.use('/', indexRouter);
app.use('/users', usersRouter);

<<<<<<< Updated upstream
function auth (req, res, next) {
  console.log(req.session);

  if(!req.session.user) {
    var err = new Error('You are not authenticated!');
    err.status = 403;
    return next(err);
  }
  else {
    if (req.session.user === 'authenticated') {
      next();
    }
    else {
      var err = new Error('You are not authenticated!');
      err.status = 403;
      return next(err);
    }
  }
}
/*

1. authHeader.split(' ') - This splits the authentication header into an array with two elements: "Basic" and the encoded credentials.

Example: ['Basic', 'dXNlcjpwYXNzd29yZA==']

2. authHeader.split(' ')[1] - This retrieves the second element from the array, which contains the encoded credentials.

Example: 'dXNlcjpwYXNzd29yZA=='

3. new Buffer.from(authHeader.split(' ')[1], 'base64') - This creates a new Buffer object from the base64-encoded string.

Example: <Buffer 75 73 65 72 3a 70 61 73 73 77 6f 72 64>

4. .toString() - This converts the Buffer object to a string.

Example: 'user:password'

5.  .split(':') - This splits the string into an array with two elements: the username and password.

Example: ['user', 'password']

*/


app.use(auth);
=======
>>>>>>> Stashed changes

app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
