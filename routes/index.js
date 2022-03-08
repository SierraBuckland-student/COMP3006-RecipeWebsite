var express = require('express');
var router = express.Router();
const User = require('../models/user'); 
const passport = require('passport');
const role = require('../config/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Recipe Website',
    user: req.user
  });
});

//get handler for login
router.get('/login', (req, res, next) => {
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render('login', { title: 'Login', messages: messages });
});

//post handler for login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureMessage: 'Invalid Credentials'
}));

//get handler for register
router.get('/register', (req, res, next) => {
  res.render('register', {title: 'Create an Account'});
});

//post handler for register
router.post('/register', (req, res, next) => {
  User.register(
    new User({ username: req.body.username, role: role.BASIC}),
    req.body.password,
    (err, newUser) => {
      if(err) {
        console.log(err);
        return res.redirect('/register');
      }
      else {
        req.login(newUser, (err) => {
          res.redirect('/');
        })
      }
    }
  )
});

//get for logout
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
