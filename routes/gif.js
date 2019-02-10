'use strict'

const express = require('express'),
      router  = express.Router({mergeParams: true}),
      User    = require('../models/user'),
      request = require('request'),
      Gif     = require('../models/gif'),
      middlewareObj = require('../middleware/index'),
      passport = require('passport');

//ROUTES
router.get('/', function(req, res){
    res.render('home')
});

router.get('/upload', middlewareObj.isAuthenticated, function(req, res){
res.render('create')
});

router.post('/upload', middlewareObj.isAuthenticated, function(req, res){
let author = {id: req.user._id, username: req.user.username};
let newGif = {name: req.body.name, image: req.body.image, author: author};
Gif.create(newGif, function(err, gif){
    if(err){
        console.log(err)
    }
    else{
        res.redirect('/favorites')
    }
})

})

router.get('/favorites', middlewareObj.isAuthenticated, function(req, res){
Gif.find({}, function(err, gifs){
    res.render('favorites', {gifs: gifs, res: 'Favorites'})
})
})

router.delete('/favorites/:id', function(req, res){
Gif.findByIdAndDelete(req.params.id, function(err, gif){
    if(err){
        console.log(err)
    }
    else{
        res.redirect('/favorites')
    }
})
})


router.get('/search', function(req, res){
request(`http://api.giphy.com/v1/gifs/search?q=${encodeURI(req.query.name)}&api_key=Uejb4jkKWw91TLRob4aVG5sFdL4WHzC5`, function(err, response, body){
    if(err){
        console.log(err)
    }
    else{
        let result = JSON.parse(body);
        console.log(result);
        res.render('search', {result: result});
    }
})


})

module.exports = router;
