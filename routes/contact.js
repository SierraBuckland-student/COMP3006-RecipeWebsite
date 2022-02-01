//The router for the Contact Us page

var express = require('express'); 
var router = express.Router();

//Will display contents of the About Us Page

router.get('/', function(req, res, next) {
    res.render('contact', {title: 'Contact Us'})
});

module.exports = router;