const admin = require('../models/admin');
const seedData = require('./seedData');
const bcrypt = require('bcrypt');
const product = require('../models/product');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/beverageSite');

const db = mongoose.connection;

db.on('error', () => console.log('Error connecting to the database'));
db.once('open', () => console.log('Connected to the database successfully'));

// const seedDb = async () => {
//     await admin.deleteMany({});

//     for(let element of seedData)
//     {
//         const hash = await bcrypt.hash(element.password, 12);
//         const newAdmin = new admin({
//             username: element.username,
//             password: hash
//         });

//         await newAdmin.save();
//     }
// }

const seedDb = async() => {
    await product.deleteMany({});
    
    for(let element of seedData) {
        const newProduct = new product({
            name: element.name,
            price: element.price,
            description: element.description,
            image: element.image,
            listingStatus: true
        });

        await newProduct.save();
    }
}

seedDb().then(() => {
    db.close();
})