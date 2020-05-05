const Product = require("../Model/productModel");

exports.read = (req, res) => {
    
    Product.find((err, data) => {
        if (err) return console.error(err);
        res.json(data);
    })
} 

exports.create = (req, res) => {
    let productAdd = new Product({
        article: req.body.article,
        describe: req.body.describe,
        price: req.body.price,
        quantity: req.body.quantity,
        photo: req.body.photo,
        category: req.body.category
    })

    productAdd.save((err, data) => {
        if (err) return console.error(err);
        res.send('User Created successfully')
    })
} 

exports.delete = (req, res) => {
    console.log(req.body.id)
    Product.findOneAndDelete({_id:req.body.id},(err) => {
        if (err) return console.error(err);
    })
} 

exports.update = (req, res) => {
    Product.findOneAndUpdate({_id:req.body.id},{$set:
        {
            article: req.body.article,
            describe: req.body.describe,
            price: req.body.price,
            quantity: req.body.quantity,  
            photo: req.body.photo,
            category: req.body.category
        }},
        (err) => {
        if (err) return console.error(err);
    })
} 