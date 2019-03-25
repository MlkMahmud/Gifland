'use strict'

const express = require('express');
const router = express.Router({ mergeParams: true });
const middlewareObj = require('../middleware/index');
const User = require('../models/user');
const passport = require('passport');

//ROUTES
router.get('/register', (req, res) => {
  res.render('register')
});

router.post('/register', (req, res) => {
  User.register(new User({ username: req.body.username }), req.body.password, (err, user) => {
    if (err) {
      console.log(err)
      res.redirect('/register');
    }
    else {
      passport.authenticate("local")(req, res, function () {
        req.flash('success', `Welcome to Gifland, ${req.user.username}`)
        res.redirect('/');
      });
    }
  });
});

router.get('/logout', middlewareObj.isAuthenticated, (req, res) => {
  req.flash('success', `Farewell ${req.user.username}`);
  req.logOut();
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), function (req, res) {
  req.flash('success', `Welcome Back ${req.body.username}`)
  res.redirect('/');
});

module.exports = router;
