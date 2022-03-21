var express = require('express');
var router = express.Router();
const User = require('../models/user'); 
const passport = require('passport');
const role = require('../config/auth');
const Recipe = require('../models/recipe');

/* GET home page. */
router.get('/', function(req, res, next) {

  //Retrieve one random recipe (or one random document) from our collection/database
  Recipe.aggregate([{$sample: {size: 1}}], (err, recipe)=> {

    if(err) {
      console.log(err);
    }

    else {
      res.render('index', { 
        title: 'The Ham Samwichez',
        dataset: recipe,
        user: req.user
      });
    }

  })
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
    new User({ username: req.body.username}),
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
