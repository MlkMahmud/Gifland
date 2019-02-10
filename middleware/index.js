'use strict'

const express = require('express'),
      passport = require('passport');

let middlewareObj = {
    isAuthenticated: function(req, res, next){
        if(req.isAuthenticated()){
            return next()
        }
        else{
            res.redirect('/login')
        }
    }
}

module.exports = middlewareObj;