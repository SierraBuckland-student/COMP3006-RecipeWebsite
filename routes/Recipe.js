var express = require('express');
const Recipe = require('../models/recipe')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('recipes/index', { title: 'Recipe Website'});
});

  //Export router 

  module.exports = router;