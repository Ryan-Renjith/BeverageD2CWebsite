const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const methodOverride = require('method-override');
const bcrypt = require('bcrypt');
const session = require('express-session');

const admin = require('./models/admin');
const product = require('./models/product');
const order = require('./models/order');

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


app.get('/home', async (req,res) => {
    if(!req.session.cartItems) {
        req.session.cartItems = [];
    }

    const products = await product.find({});
    res.render('mainView/home', {products});
});

app.post('/home/:id', async (req,res) => {
    const {id} = req.params;
    req.session.cartItems = req.session.cartItems || [];
    if(!req.session.cartItems.includes(id)) {
        req.session.cartItems.push(id);
    }
    res.redirect('/home');
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

app.get('/cart', async (req,res) => {
    //cartItems = await product.find({ _id: { $in: req.session.cartItems } });
    let cartItems = [];
    for(let i=0; i<req.session.cartItems.length; i++) {
        let element  = await product.findById(req.session.cartItems[i]);
        cartItems.push(element);
    }
    res.render('mainView/cart', {cartItems});
});

app.post('/cart', async (req,res) => {
    const currOrder = new order();
    let totalAmount = 0;
    for(let i=0; i<req.session.cartItems.length; i++) {
        currOrder.items.push({productId: req.session.cartItems[i], quantity: req.body.quantities[i]});
        const currProduct = await product.findById(req.session.cartItems[i]);
        totalAmount = totalAmount + (currProduct.price * req.body.quantities[i]);
    }

    currOrder.totalAmount = totalAmount;
    savedOrder = await currOrder.save();
    res.redirect(`/billing/${savedOrder._id}`);
});

app.get('/empty', (req,res) => {
    req.session.cartItems = [];
    res.redirect('/cart');
});

app.get('/billing/:id', async (req,res) => {
    const {id} = req.params;
    const currOrder = await order.findById(id).populate('items.productId');
    res.render('mainView/billing', {currOrder});
});

app.post('/billing/:id', async (req,res) => {
    const {id} = req.params;
    const currOrder = await order.findById(id);
    currOrder.mobileNo = req.body.mobileNo;
    currOrder.address = req.body.address;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = dd + '-' + mm + '-' + yyyy;

    currOrder.date = today;
    currOrder.completedStatus = false;

    await currOrder.save();
    req.session.cartItems = [];
    res.redirect('/home');
    
});


app.listen(3000, () => {
    console.log("Server listening on PORT 3000");
});