var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('tools', { 
    title: 'Tools',
    user: req.user
  });
});

module.exports = router;
