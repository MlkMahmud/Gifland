'use strict'

const mongoose = require('mongoose');
const passportMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});

UserSchema.plugin(passportMongoose);

module.exports = mongoose.model('User', UserSchema);
