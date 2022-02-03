//Connects us to the About-Us Page

var express = require('express'); 
var router = express.Router();

//Will display contents of the About Us Page

router.get('/', function(req, res, next) {
    res.render('about', {
        title: 'About Our Website',
        user: req.user
    });
});

module.exports = router;

