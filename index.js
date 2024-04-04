const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const session = require('express-session');

const admin = require('./models/admin');

app.use(express.urlencoded({extended: true}));  //For express to parse URL-encoded data in request body
app.use(methodOverride('_method'));
app.use(express.static('public'))  //serve the static files in the public folder

app.use(session({secret: 'littleking19'})); //session management using signed cookies

mongoose.connect('mongodb://localhost:27017/beverageSite');
const db = mongoose.connection;
db.on("error", () => console.error("Error connecting to the database"));
db.once("open", () => console.log("Connected to the database successfully"));

app.set('view engine', 'ejs');
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));


const requireLogin = (req,res,next) => {
    if(!req.session.admin_id)
        return res.redirect('/home');

    next();
}


app.get('/home', (req,res) => {
    res.render('mainView/home');
});

app.get('/admin/login', (req,res) => {
    if(req.session.admin_id)
        return res.render('adminView/home');
    
    res.render('mainView/adminLogin');
});

app.post('/admin/login', async (req,res) => {
    const {username, password} = req.body.admin;
    const currAdmin = await admin.findOne({username});
    
    if(!currAdmin)
        return res.redirect('/admin/login');

    const validPassword = await bcrypt.compare(password, currAdmin.password);


    if(validPassword) {
        req.session.admin_id = currAdmin._id;
        res.redirect('/admin/home');
    } 
    else
        res.redirect('/admin/login');
});

app.get('/admin/home', requireLogin, (req,res) => {
    res.render('adminView/home');
});

app.post('/logout', (req,res) => {
    req.session.destroy();
    res.redirect('/home');
})

app.get('/admin/orderList', requireLogin, (req,res) => {
    res.render('adminView/orderList');
});

app.get('/admin/pastOrders', requireLogin, (req,res) => {
    res.render('adminView/pastOrders');
});

app.get('/admin/products', requireLogin, (req,res) => {
    res.render('adminView/products');
});

app.get('/cart', requireLogin, (req,res) => {
    res.render('mainView/cart');
});


app.listen(3000, () => {
    console.log("Server listening on PORT 3000");
});