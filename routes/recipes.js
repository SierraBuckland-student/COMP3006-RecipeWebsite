var express = require('express'); 
var helpers = require('handlebars-helpers')();
var router = express.Router();
const Recipe = require('../models/recipe');
const User = require('../models/user');
const multer = require('multer');


//checking if the users is logged in
function IsLoggedIn(req,res,next) {
  if (req.isAuthenticated()) {
      return next();
  }
  res.redirect('/login');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // Make the query parameters consts to search against
  const searchBarValue = req.query.search;
  const mealTimeValue = req.query.mealTime;
  const mealProteinValue = req.query.mealProtein; 
  const timeValue = req.query.time;

  if(searchBarValue){
    Recipe.find({$text: {$search: searchBarValue}}, (err, recipe) => {
      if (err) {
        console.log(err);
      }
      else {
        res.render('recipes/index', { 
          title: 'The Ham Samwichez', 
          dataset: recipe,
          user: req.user,
          role: req.role
        });
      }
    }
  );
  // If all values are in the filter string
  } else if(mealTimeValue && mealProteinValue && timeValue ){ //if the filter has been used
    Recipe.find({
      mealProtein: { "$in": [mealProteinValue]},
      mealTime: { "$in": [mealTimeValue]},
      totalTime: { "$in": [timeValue]}
    }, (err, recipe) => { 
      if (err) {
        console.log(err);
      }
      else {
        res.render('recipes/index', { 
          title: 'The Ham Samwichez', 
          dataset: recipe,
          user: req.user,
          role: req.role
        });
      }
    }
  );
  } 
  // If Protein  and mealtime is available
  else if(mealTimeValue && mealProteinValue){ //if the filter has been used
    Recipe.find({
      mealProtein: { "$in": [mealProteinValue]},
      mealTime: { "$in": [mealTimeValue]}
    }, (err, recipe) => { 
      if (err) {
        console.log(err);
      }
      else {
        res.render('recipes/index', { 
          title: 'The Ham Samwichez', 
          dataset: recipe,
          user: req.user,
          role: req.role
        });
      }
    }
  );
  } 
  //If protein and totaltime are available
  else if(mealProteinValue && timeValue ){ //if the filter has been used
    Recipe.find({
      mealProtein: { "$in": [mealProteinValue]},
      totalTime: { "$in": [timeValue]}
    }, (err, recipe) => { 
      if (err) {
        console.log(err);
      }
      else {
        res.render('recipes/index', { 
          title: 'The Ham Samwichez', 
          dataset: recipe,
          user: req.user,
          role: req.role
        });
      }
    }
  );
  } 
  //If meal and time are inputted
  else if(mealTimeValue && timeValue ){ //if the filter has been used
    Recipe.find({
      mealTime: { "$in": [mealTimeValue]},
      totalTime: { "$in": [timeValue]}
    }, (err, recipe) => { 
      if (err) {
        console.log(err);
      }
      else {
        res.render('recipes/index', { 
          title: 'The Ham Samwichez', 
          dataset: recipe,
          user: req.user,
          role: req.role
        });
      }
    }
  );
  } 
  // If just mealTime is inputted
  else if(mealTimeValue){ //if the filter has been used
    Recipe.find({
      mealTime: { "$in": [mealTimeValue]}
    }, (err, recipe) => { 
      if (err) {
        console.log(err);
      }
      else {
        res.render('recipes/index', { 
          title: 'The Ham Samwichez', 
          dataset: recipe,
          user: req.user,
          role: req.role
        });
      }
    }
  );
  } 
  // If just Protein is inputted
  else if(mealProteinValue){ //if the filter has been used
    Recipe.find({
      mealProtein: { "$in": [mealProteinValue]}
    }, (err, recipe) => { 
      if (err) {
        console.log(err);
      }
      else {
        res.render('recipes/index', { 
          title: 'The Ham Samwichez', 
          dataset: recipe,
          user: req.user,
          role: req.role
        });
      }
    }
  );
  } 
  //if total time 
  else if(timeValue ){ //if the filter has been used
    Recipe.find({
      totalTime: { "$in": [timeValue]}
    }, (err, recipe) => { 
      if (err) {
        console.log(err);
      }
      else {
        res.render('recipes/index', { 
          title: 'The Ham Samwichez', 
          dataset: recipe,
          user: req.user,
          role: req.role
        });
      }
    }
  );
  } 
  // If all else fails
  else {
    Recipe.find((err, recipe) => {
      if (err) {
        console.log(err);
      }
      else {
        res.render('recipes/index', { 
          title: 'The Ham Samwichez', 
          dataset: recipe,
          user: req.user,
          role: req.role
        });
      }
    }
  );
  }

});

//get for adding a recipe page
router.get('/add', IsLoggedIn, (req, res, next) => {
  res.render('recipes/add', {
      title: 'Add a new recipe',
      user: req.user
  });
});



// Define the Storage of the image
const storage = multer.diskStorage({
  // Destination for files
  destination:function(req, file, callback){
    callback(null, './uploads/'); // errormsg, destination string of where the file will be saved
  },
  // add back the file type as multer strips it on storage
  filename:function(req, file, callback){
    if (!file){ // If the file doesn't exist
      callback(null, 'HamSandwich.jpg');
    } else {
      callback(null, Date.now()+file.originalname); //DateNow gives it a time stamp along with file.originalname allows it to be dynamic for each photo
    }
  }
});

//upload parameter for multer
const upload = multer({
  storage:storage,
  fileFilter: (req, file, callback) => { // Adding file type validation to uploads
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      callback(null, true);
    } else {
      callback(null, false);
      return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
}).single("img");


//POST handler for adding a recipe
router.post('/add', IsLoggedIn, upload, (req, res, next) => {
  //validate for required fields
  if (!req.body.author) {
      res.json({ 'Validation Error': 'Recipe author is a required field' }).status(400);
  }
  else if (!req.body.title) {
      res.json({ 'Validation Error': 'Recipe title is a required field' }).status(400);
  }
  else if (!req.body.totalTime) {
    res.json({ 'Validation Error': 'Recipe total time is a required field' }).status(400);
  }
  else if (!req.body.servings) {
    res.json({ 'Validation Error': 'Recipe servings time is a required field' }).status(400);
  }
  else if (!req.body.ingredients) {
    res.json({ 'Validation Error': 'Recipe ingredients time is a required field' }).status(400);
  }
  else if (!req.body.steps) {
    res.json({ 'Validation Error': 'Recipe steps time is a required field' }).status(400);
  }
  else {
    Recipe.create({ 
      userID: req.user._id,
      author: req.body.author,
      title: req.body.title,
      img: req.file.filename,
      totalTime: req.body.totalTime,
      cookTime: req.body.cookTime,
      servings: req.body.servings,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      rating: req.body.rating,
      mealProtein: req.body.mealProtein,
      mealTime: req.body.mealTime
  }, // add recipe to the db
  (err, newRecipe) => {
      if (err) {
          console.log(err);
          res.json({ 'Error Message': 'Server threw exception' }).status(500);
      }
      else {
        res.render('recipes/view', 
        {
          title: 'View Recipe', 
          recipe: newRecipe,
          user: req.user
        }) 
      }});
  }
});

//get handler for recipe edit   
router.get('/edit/:_id', IsLoggedIn, (req, res, next) => {
  Recipe.findById(req.params._id, (err, recipe) => {
      if(err) {
          console.log(err);
      }
      else {
        res.render('recipes/edit', { 
          title: 'Edit a Recipe',
          recipe: recipe,
          user: req.user
      });
    }   
  });
});

//post handler for editing record
router.post('/edit/:_id', IsLoggedIn, upload, (req, res, next) => {
  if(!req.body.img){
    Recipe.findOneAndUpdate({ _id: req.params._id},
      {
        userID: req.user._id,
        author: req.body.author,
        img: 'HamSandwich.jpg',
        title: req.body.title,
        totalTime: req.body.totalTime,
        cookTime: req.body.cookTime,
        servings: req.body.servings,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        rating: req.body.rating,
        mealProtein: req.body.mealProtein,
        mealTime: req.body.mealTime
  }, (err, updatedRecipe) => {
      if (err) {
          console.log(err);
      }
      //else if admin return to recipes page
      else if (req.user.role == "admin") {
        res.redirect('/recipes');
      }
      //if user return to yourRecipes page
      else {
        res.redirect('/profiles/yourRecipes/:_id');
      }
  });
  } else {
    Recipe.findOneAndUpdate({ _id: req.params._id},
      {
        userID: req.user._id,
        author: req.body.author,
        img:req.file.filename,
        title: req.body.title,
        totalTime: req.body.totalTime,
        cookTime: req.body.cookTime,
        servings: req.body.servings,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        rating: req.body.rating,
        mealProtein: req.body.mealProtein,
        mealTime: req.body.mealTime
  }, (err, updatedRecipe) => {
      if (err) {
          console.log(err);
      }
      //else if admin return to recipes page
      else if (req.user.role == "admin") {
        res.redirect('/recipes');
      }
      //if user return to yourRecipes page
      else {
        res.redirect('/profiles/yourRecipes/:_id');
      }
  });
  }
});

//DELETE handler for recipe   
router.get('/delete/:_id', IsLoggedIn, (req, res, next) => {
  Recipe.remove({_id: req.params._id }, (err) => {
      if(err) {
          console.log(err);
      }
      //else if admin return to recipes page
      else if (req.user.role == "admin") {
        res.redirect('/recipes');
      }
      //if user return to yourRecipes page
      else {
        res.redirect('/profiles/yourRecipes/:_id');
      }
  });
});

// The Router to the single recipe page 
router.get('/view/:_id', (req, response, next) => {
  Recipe.findById(req.params._id, (err, recipe) => { // Based on the id grab the correct information for the view
      if (err){
          console.log(err);
      }
      else {
          //render the grabbed info and put it into the form (edit view)
          response.render('recipes/view', 
          {
            title: 'View Recipe', 
            recipe: recipe,
            user: req.user
          }) 
      } 
  })
});

//Export router 
module.exports = router;