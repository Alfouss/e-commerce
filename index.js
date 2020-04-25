const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// mongoose.connect('mongodb://localhost:27017/products', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost:27017/products', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
mongoose.set('useFindAndModify', false);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
   console.log("we're connected to mongo!")
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const users = require('./MCR/Routes/UserRoute')
const products= require('./MCR/Routes/ProductRoute')
app.use('/loggin', users);
app.use('/product', products);


let port = 1234;
app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});