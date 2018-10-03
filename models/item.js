const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");

 
// Define your schema as normal.
const itemschema = mongoose.Schema({
    name:  String,
    description: String,
    image: String,
    date:{ type: Date },
    bids:Number,
});
 
itemschema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Item', itemschema);