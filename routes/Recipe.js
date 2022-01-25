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
      res.render('recipes/index', { title: 'Recipe Website'});
      console.log(recipe);
    }
  }
);
});


  //Export router 

  module.exports = router;