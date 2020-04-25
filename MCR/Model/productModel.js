const mongoose = require("mongoose"); 
let Schema = mongoose.Schema;

let Product = new Schema({
    article: {type:String, required:true},
    price: {type:Number, required:true},
    quantity: {type:Number, required:true},
    photo:{type:String, required:false},
    category:{type:String, required:false}
})

module.exports = mongoose.model("Product", Product)