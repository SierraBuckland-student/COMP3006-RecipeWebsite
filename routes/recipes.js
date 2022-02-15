var express = require('express');
var router = express.Router();
const Recipe = require('../models/recipe')

/* GET home page. */
router.get('/', function(req, res, next) {
  const searchBarValue = req.query.search;
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
router.get('/add', (req, res, next) => {
  res.render('recipes/add', {
      title: 'Add a new recipe, Hello WORLDS',
      user: req.user
  });
});

//POST handler for adding a recipe
router.post('/add', (req, res, next) => {
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
                  //if it was able to be created return object
                  //res.json(newRecipe).status(200);
                  res.redirect('/recipes');
              }
          }
      ); 
  }
});

//get handler for animal edit   
router.get('/edit/:_id', (req, res, next) => {
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
router.post('/edit/:_id', (req, res, next) => {
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
        tags: req.body.tags
  }, (err, updatedRecipe) => {
      if (err) {
          console.log(err);
      }
      else {
          res.redirect('/recipes');
      }
  });
});

//DELETE handler for recipe   
router.get('/delete/:_id', (req, res, next) => {
  Recipe.remove({_id: req.params._id }, (err) => {
      if(err) {
          console.log(err);
      }
      else {
          res.redirect('/recipes')
      }
  });
});


//Export router 
module.exports = router;