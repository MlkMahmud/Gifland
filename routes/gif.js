'use strict'

const express = require('express');
const router = express.Router({ mergeParams: true });
const Gif = require('../models/gif');
const middlewareObj = require('../middleware/index');
const apikey = process.env.APIKEY;
const fetch = require('node-fetch');

//ROUTES
router.get('/', (req, res) => {
  res.render('home')
});

router.get('/upload', middlewareObj.isAuthenticated, (req, res) => {
  res.render('create')
});

router.post('/upload', middlewareObj.isAuthenticated, (req, res) => {
  const author = { id: req.user._id, username: req.user.username };
  const newGif = { name: req.body.name, image: req.body.image, author };
  Gif.create(newGif, (err, gif) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/favorites');
    }
  });
});

router.get('/favorites', middlewareObj.isAuthenticated, (req, res) => {
  Gif.find({}, (err, gifs) => {
    res.render('favorites', { gifs, title: 'Favorites' });
  });
});

router.delete('/favorites/:id', (req, res) => {
  Gif.findByIdAndDelete(req.params.id, (err, gif) => {
    if (err) {
      console.log(err);
    }
    else {
      res.redirect('/favorites');
    }
  });
});

router.get('/search', (req, res) => {
  fetch(`http://api.giphy.com/v1/gifs/search?q=${encodeURI(req.query.name)}&api_key=${apikey}`)
    .then(res => res.json()).then(result => res.render('search', { result }))
    .catch(() => res.status(400).json("Error"));
});


module.exports = router;
