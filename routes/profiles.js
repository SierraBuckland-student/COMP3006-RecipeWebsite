var express = require('express');
const user = require('../models/user');
var router = express.Router();
const User = require('../models/user'); 
const passport = require('passport');
const session = require('express-session');

//checking if the users is logged in
function IsLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

/* GET handler for profile page */
router.get('/:_id', IsLoggedIn, (req, res, next) => {
    res.render('profiles/index', {title: 'Profile', user: req.user});
    console.log(req.session.passport._id)
})

/* GET handler for the profile edit page */
// router.get('/edit', (req, res, next) => {
//     res.render('profiles/edit', {title: 'Profile', user: req.user});
// });

router.get('/edit/:_id', IsLoggedIn, (req, res, next) => {
    
    User.findById(req.params._id, (err, user) => {
        
        if(err) {
            console.log(err);
        }
        else {
          res.render('profiles/edit', { 
            title: 'Edit Profile',
            user: req.user
        });
      }   
    });
});

router.post('/edit/:_id', IsLoggedIn, (req, res, next) => {
    console.log(req.params._id)
    user.findOneAndUpdate({ _id: req.params._id},
        {
            username: req.body.username
        }, (err, updatedRecipe) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/recipes');
        }
    });
  });

module.exports = router;