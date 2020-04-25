const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstname: {type: String, required: false},
    lastname:{type: String, required: false},
    mail: {type: String, required: true},
    password:{type: String, required: true},
    phone:{type: Number, required: false}
});

module.exports = mongoose.model("User",UserSchema );