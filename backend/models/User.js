const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let user = new Schema({
    name:String,
    email:String,
    password:String,
    friends:String[{}]
});