var express = require('express');
var router = express.Router();
const Recipe = require('../models/recipe');
const User = require('../models/user');

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
          title: 'Recipe Website', 
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
          title: 'Recipe Website', 
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
          title: 'Recipe Website', 
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
          title: 'Recipe Website', 
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
          title: 'Recipe Website', 
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
          title: 'Recipe Website', 
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
          title: 'Recipe Website', 
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
          title: 'Recipe Website', 
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
          title: 'Recipe Website', 
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

//POST handler for adding a recipe
router.post('/add', IsLoggedIn, (req, res, next) => {
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
              }
          }
      ); 
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
router.post('/edit/:_id', IsLoggedIn, (req, res, next) => {
  Recipe.findOneAndUpdate({ _id: req.params._id},
      {
        author: req.body.author,
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