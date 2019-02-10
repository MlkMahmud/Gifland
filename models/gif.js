'use strict'

const mongoose = require('mongoose'),


GifSchema = new mongoose.Schema({
    name: String,
    image: String,
    author: {
            id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
            },
        username: String
    }
});


module.exports = mongoose.model('Gif', GifSchema);