var express = require('express');
const Recipe = require('../models/recipe')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Recipe.find((err, recipe) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render('recipes/index', { title: 'Recipe Website', dataset: recipe});
      console.log(recipe);
    }
  }
);
});


//POST handler for addign a recipe
router.post('/', (req, res, next) => {
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
                  res.json(newRecipe).status(200);
              }
          }
      ); 
  }
});

//DELETE handler for recipe
router.delete('/:_id', (req, res, next) => {
  Recipe.remove(
      { _id: req.params._id }, // filter for results with the specified id 
      (err) => {
          if (err) {
              console.log(err);
              res.json({ 'Error Message': 'Server threw exception' }).status(500);                
          }
          else {
              res.json({ 'success': 'true' }).status(200);
          }
      }
  );
});


//Export router 

module.exports = router;