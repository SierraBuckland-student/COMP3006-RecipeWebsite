var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const config = require('./config/globals')



var indexRouter = require('./routes/index');
var recipeRouter = require('./routes/recipes');
var toolsRouter = require('./routes/tools');
var aboutRouter = require('./routes/about'); 
var contactRouter = require('./routes/contact');
var profileRouter = require('./routes/profiles');
var authRouter = require('./routes/auth');

//import passport and session
const passport = require('passport');
const session = require('express-session');

//github and google oauth
const GithubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

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

//Google Auth
passport.use(new GoogleStrategy({
  clientID: config.google.clientId,
  clientSecret: config.google.clientSecret,
  callbackURL: config.google.callbackUrl
},
  async (accessToken, refreshToken, profile, done) => {
    const user = await User.findOne({ oauthId: profile.id });
    if(user) {
      return done(null, user);
    }
    else {
      const newUser = new User({
        username: profile.displayName,
        oauthId: profile.id,
        oauthProvider: 'Google',
        created: Date.now()
      });
      //add new user to db
      const saveUser = await newUser.save();
      return done(null, saveUser);
    }
  })
);

//Github auth
passport.use(new GithubStrategy({
  clientID: config.github.clientId,
  clientSecret: config.github.clientSecret,
  callbackURL: config.github.callbackUrl
},
async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOne({ oauthId: profile.id });
  if(user) {
    return done(null, user);
  }
  else {
    const newUser = new User({
      username: profile.username,
      oauthId: profile.id,
      oauthProvider: 'GitHub',
      created: Date.now()
    });
    //add new user to db
    const saveUser = await newUser.save();
    return done(null, saveUser);
  }
})
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Page Routes
app.use('/', indexRouter);
app.use('/recipes', recipeRouter);
app.use('/tools', toolsRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/profiles', profileRouter);
app.use('/auth', authRouter);

// Connecting to Database
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true })
.then((message) => {
  console.log('Connected Successfully to Database')
})
.catch((err) => {
  console.log(err);
})

// HBS Helper Method to select values from dropdown lists
const hbs = require('hbs');
// function name and helper function with parameters
hbs.registerHelper('createOption', (currentValue, selectedValue) => {
  // initialize selected property
  var selectedProperty = '';
  // if values are equal set selectedProperty accordingly
  if (currentValue == selectedValue) {
    selectedProperty = 'selected';
  }
  // return html code for this option element
  // return new hbs.SafeString('<option '+ selectedProperty +'>' + currentValue + '</option>');
  return new hbs.SafeString(`<option ${selectedProperty}>${currentValue}</option>`);
});

//hbs helper method for comparison if statement
hbs.registerHelper('ifeq', function (a, b, options) {
  if (a == b) { return options.fn(this); }
  return options.inverse(this);
});

hbs.registerHelper('ifnoteq', function (a, b, options) {
  if (a != b) { return options.fn(this); }
  return options.inverse(this);
});

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
