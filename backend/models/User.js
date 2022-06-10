const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
    username:String,
    email:String,
    password:String,
    friends:String,
    friendsreqs:String,
}, {
    collection: 'users'
});

module.exports = mongoose.model('User', user);