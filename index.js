const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended: true}));  //For express to parse URL-encoded data in request body
app.use(methodOverride('_method'));
app.use(express.static('public'))  //serve the static files in the public folder

mongoose.connect('mongodb://localhost:27017/beverageSite');
const db = mongoose.connection;
db.on("error", () => console.error("Error connecting to the database"));
db.once("open", () => console.log("Connected to the database successfully"));

app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));


app.get('/home', (req,res) => {
    res.render('mainView/home');
});

app.get('/admin/login', (req,res) => {
    res.render('mainView/adminLogin');
});

app.get('/admin/home', (req,res) => {
    res.render('adminView/home');
});

app.get('/admin/orderList', (req,res) => {
    res.render('adminView/orderList');
});

app.get('/admin/pastOrders', (req,res) => {
    res.render('adminView/pastOrders');
});

app.get('/admin/products', (req,res) => {
    res.render('adminView/products');
});

app.get('/cart', (req,res) => {
    res.render('mainView/cart');
});


app.listen(3000, () => {
    console.log("Server listening on PORT 3000");
});