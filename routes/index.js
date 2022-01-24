var express = require('express');
var router = express.Router();

const title = 'Oatmeal'
const ingredients = '1 cup steel cut oats, 3 cups water, ¼ teaspoon sea salt'
const method = 'Bring the water to a boil in a medium pot. Add the oats and salt and reduce heat to medium-low. Cook, stirring occasionally, for 15 to 20 minutes, or until thickened. Stir in cinnamon, nutmeg, or cardamom, if desired. Remove from heat and let stand for two minutes. Serve hot with desired toppings and honey or maple syrup, if desired.'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Recipe' });
  console.log(title, ingredients, method);
});

module.exports = router;
