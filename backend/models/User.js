const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let user = new Schema({
    username:String,
    email:String,
    password:String,
    friends:[String],
    friendsreqs:[String],
}, {
    collection: 'users'
});

let message = new Schema({
    senderid:String,
    sendertime:String,
    receiverid:String,
    message:String,
    receivertime:String,
    seenstatus:String,
}, {
    collection: 'messages'
});

module.exports = mongoose.model('User', user);
module.exports = mongoose.model('Message', message);