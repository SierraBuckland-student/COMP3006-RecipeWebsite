var express = require('express');
var router = express.Router();
const User = require('../models/user'); 

/* GET handler for profile page */
router.get('/', (req, res, next) => {
    res.render('profiles/index', {title: 'Profile', user: req.user});
})

module.exports = router;