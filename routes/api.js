'use strict'

const request = require('request'),
      express = require('express'),
      router  = express.Router({mergeParams: true});

router.get('/trending', function(req, res){
    request('http://api.giphy.com/v1/gifs/trending?api_key=Uejb4jkKWw91TLRob4aVG5sFdL4WHzC5', function(err, response, body){
        if(err){
            console.log(err)
        }
        else{
            let result = JSON.parse(body);
            res.render('trending', {result: result, res:'Trending'})
        }
    })
})


router.get('/:res', function(req, res){
    request(`http://api.giphy.com/v1/gifs/search?q=${req.params.res}&api_key=Uejb4jkKWw91TLRob4aVG5sFdL4WHzC5`, function(err, response, body){
        if(err){
            console.log(err)
        }
        else if(response.statusCode === 200){
            let result = JSON.parse(body);
            res.render('path', {result: result, res: req.params.res});
        }
    })
})

router.get('*', function(req, res){
    res.send('Bitch, Please!!')
})


module.exports = router;