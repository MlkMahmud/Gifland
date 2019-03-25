'use strict';
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const passportLocal = require('passport-local');
const methodOverride = require('method-override');
const User = require('./models/user');
const flash = require('connect-flash');
const session = require('express-session');
const apiRoutes = require('./routes/api');
const gifRoutes = require('./routes/gif');
const port = process.env.PORT || 4000;
const indexRoutes = require('./routes/index');
const app = express();

//  Mongoose Setup
mongoose.connect('mongodb://localhost/giphy', { useNewUrlParser: true });

//  EXPRESS SETUP
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static('public'));

//PASSPORT SETUP
app.use(
  session({
    secret: 'Random Text',
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.arr = arr;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use(gifRoutes);
app.use(indexRoutes);
app.use(apiRoutes);

// CALENDAR VARIABLE
const arr = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

app.listen(port);
