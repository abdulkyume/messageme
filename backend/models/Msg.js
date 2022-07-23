const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('Message', message);