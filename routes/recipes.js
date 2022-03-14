var express = require('express');
var router = express.Router();
const Recipe = require('../models/recipe')

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
  const mealValue = req.query.meals;
  const mealTypeValue = req.query.mealType; 
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
          user: req.user
        });
      }
    }
  );
  } else if(mealValue || mealTypeValue || timeValue){
    Recipe.find({$text: {$search: mealValue}}, (err, recipe) => { //~~~~~~~~~Easier way to do all 3 at once or they're else if statements
      if (err) {
        console.log(err);
      }
      else {
        res.render('recipes/index', { 
          title: 'Recipe Website', 
          dataset: recipe,
          user: req.user
        });
      }
    }
  );
  } else {
    Recipe.find((err, recipe) => {
      if (err) {
        console.log(err);
      }
      else {
        res.render('recipes/index', { 
          title: 'Recipe Website', 
          dataset: recipe,
          user: req.user
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
              tags: req.body.tags
          }, // add recipe to the db
          (err, newRecipe) => {
              if (err) {
                  console.log(err);
                  res.json({ 'Error Message': 'Server threw exception' }).status(500);
              }
              else {
                  //res.json(newRecipe).status(200);
                  res.redirect('/recipes');
              }
          }
      ); 
  }
});

//get handler for animal edit   
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
        userID: req.user._id,
        author: req.body.author,
        title: req.body.title,
        totalTime: req.body.totalTime,
        cookTime: req.body.cookTime,
        servings: req.body.servings,
        ingredients: req.body.ingredients,
        steps: req.body.steps,
        rating: req.body.rating,
        tags: req.body.tags
  }, (err, updatedRecipe) => {
      if (err) {
          console.log(err);
      }
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
          response.render('recipes/view', {title: 'HELLO', recipe: recipe}) 
      } 
  })
});

//Export router 
module.exports = router;