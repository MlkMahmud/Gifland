'use strict';

const express = require('express');
const router = express.Router({ mergeParams: true });
const fetch = require('node-fetch');
const apikey = process.env.APIKEY;

router.get('/trending', (req, res) => {
  fetch(`http://api.giphy.com/v1/gifs/trending?api_key=${apikey}`)
    .then(res => res.json()).then(result => res.render('trending', { result, res: 'Trending' }))
    .catch(() => res.status(400).json('Error'));
});

router.get('/:title', (req, res) => {
  const { title } = req.params;
  fetch(`http://api.giphy.com/v1/gifs/search?q=${title}&api_key=${apikey}`)
    .then(res => res.json()).then(result => res.render('path', { result, title }))
    .catch(() => res.status(400).json('Error'));
});

router.get('*', (req, res) => {
  res.json('Welcome to nothingness!!!');
});

module.exports = router;
