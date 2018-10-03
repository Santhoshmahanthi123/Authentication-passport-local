const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require('mongoose-unique-validator');
 
var userschema = mongoose.Schema({
    username: {type: String, required: true, unique: true, dropDups: true},
    email: String,
    password: String
});
 
userschema.plugin(uniqueValidator);


userschema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userschema);