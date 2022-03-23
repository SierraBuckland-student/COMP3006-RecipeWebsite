var express = require('express');
const user = require('../models/user');
var router = express.Router();
const User = require('../models/user'); 
const passport = require('passport');
const session = require('express-session');
const Recipe = require('../models/recipe');
const recipe = require('../models/recipe');
const multer = require('multer');

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

/* GET your recipes page. */
router.get('/yourRecipes/:_id', IsLoggedIn, function(req, res, next) {
    Recipe.find({ userID: req.user._id }, (err, recipe) => {
        if (err) {
          console.log(err);
        }
        else {
          res.render('profiles/yourRecipes', { 
            title: 'Your Recipes', 
            dataset: recipe,
            user: req.user
          });
        }
      }
    );
  });
//req.recipe.userID == req.user._id


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

// Define the Storage of the image
const storage = multer.diskStorage({
  // Destination for files
  destination:function(req, file, callback){
    callback(null, './uploads/'); // error, destination string of where the file will be saved
  },
  // add back the file type as multer strips it on storage
  filename:function(req, file, callback){
    callback(null, Date.now()+file.originalname); //DateNow gives it a time stamp along with file.originalname allows it to be dynamic for each photo
  }
});

//upload parameter for multer
const upload = multer({
  storage:storage
}).single("img");


router.post('/edit/:_id', IsLoggedIn, upload, (req, res, next) => {
    console.log(req.params._id)
    user.findOneAndUpdate({ _id: req.params._id},
        {
            username: req.body.username,
            img: req.file.filename,
          }, (err, updatedRecipe) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/profiles/edit');
        }
    });
  });

module.exports = router;