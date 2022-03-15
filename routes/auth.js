var express = require('express');
var router = express.Router();
const passport = require('passport');


//get for google login
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

//google callback url
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res, next) => {res.redirect('/recipes'); }
);

//get for github login
router.get('/github', passport.authenticate('github', { scope: ['profile'] }));

//github callback url
router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res, next) => {res.redirect('/recipes'); }
);

module.exports = router;