var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/globals')

var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');
var recipeRouter = require('./routes/recipes');
var toolsRouter = require('./routes/tools');
var aboutRouter = require('./routes/about'); 
var contactRouter = require('./routes/contact');
var profileRouter = require('./routes/profiles');

//import passport and session
const passport = require('passport');
const session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//configure passport session cookie
app.use(session({
  secret: 'RecipeWebsiteCOMP3006Secret',
  resave: false,
  saveUninitialized: false
}))

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

const User = require('./models/user');
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Page Routes
app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/recipes', recipeRouter);
app.use('/tools', toolsRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/profiles', profileRouter);

// Connecting to Database
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
.then((message) => {
  console.log('Connected Successfully to Database')
})
.catch((err) => {
  console.log(err);
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
