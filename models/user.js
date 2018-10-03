const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require('mongoose-unique-validator');
 
// Define your schema as normal.
var userschema = mongoose.Schema({
    username: {type: String, required: true, unique: true },
    email: String,
    password: String
});
 
// Apply the uniqueValidator plugin to userSchema.
userschema.plugin(uniqueValidator);


userschema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userschema);