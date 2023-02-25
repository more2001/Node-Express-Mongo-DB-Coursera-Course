var express = require("express");
var router = express.Router();
const bodyParser = require("body-parser");
var User = require("../models/user");
var passport = require('passport');
var authenticate = require('../authenticate');

router.use(bodyParser.json());

router.get('/', function (req,res,next) {
  res.send('respond with a source')
});


router.post('/signup', (req, res, next) => {
  User.findOne({username: req.body.username})
  .then((user) => {
    if(user != null) {
      var err = new Error('User ' + req.body.username + ' already exists!');
      err.status = 403;
      next(err);
    }
    else {
      return User.create({username: req.body.username, password: req.body.password});
    }
  });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});


router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});


module.exports = router;
